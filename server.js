const { WebSocketServer } = require('ws');
const http = require('http');
const mysql = require('mysql');
require("dotenv").config();

//Connect to MySQL database
const sqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
sqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Create websocket server
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// A new client connection request received, send all tasks to the client
wsServer.on('connection', function (connection) {
  sqlConnection.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    connection.send(JSON.stringify(results));
  });

  // Handle messages from the client
  connection.on('message', function message(data) {
    const task = JSON.parse(data);
    //Check to make sure there is data
    if (!task) {
      return;
    }
    //Date cleanup for MySQL query
    const date = task.dueDate.substr(0, 10);

    //Adding new task to the table
    if (task.isNew) {
      sqlConnection.query(`INSERT INTO tasks (title, description, dueDate, completed) VALUES('${task.title}', '${task.description}', '${date}', ${task.completed})`, (err, results) => {
        if (err) throw err;
      });
    }
    //Updating existing task
    else {
      sqlConnection.query(`UPDATE tasks SET completed = ${task.completed === "No" ? 1 : 0} WHERE id = ${task.id}`, (err, results) => {
        if (err) throw err;
      });
    }

    //Refresh to update table on clientside
    sqlConnection.query('SELECT * FROM tasks', (err, results) => {
      if (err) throw err;
      this.send(JSON.stringify(results));
    });
  });
});
