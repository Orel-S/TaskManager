const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
require("dotenv").config();

// Express / Middleware Setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MySQL Setup
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database');
  });

  //CRUD Operations
  
  // Fetch all tasks
app.get('/api/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Create a new task
  app.post('/api/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = { title, description, dueDate };
    connection.query('INSERT INTO tasks SET ?', task, (err, result) => {
      if (err) throw err;
      res.status(201).json(result);
    });
  });
  
  // Mark a task as completed
  app.patch('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    connection.query('UPDATE tasks SET completed = true WHERE id = ?', id, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
  });
  
  // ... Implement other routes for updating, deleting tasks if needed


  //Start Server
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });