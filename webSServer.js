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

// Maintain all active connections in this object
const clients = {};

// A new client connection request received
wsServer.on('connection', function(connection) {
  console.log(`Received a new connection.`);
  sqlConnection.query('SELECT * FROM tasks', (err, results) => {
    if (err) throw err;
    connection.send(JSON.stringify(results));
    console.log(`Sent message ${JSON.stringify(results)} to user`);
  });
  
});
wsServer.on('message', function message(data) {
    console.log(`Received message ${data} from user ${sqlConnection.id}`);
    }
);
