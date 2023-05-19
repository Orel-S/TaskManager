# Task Manager App

## How To Run

This project requires a MySQL server set up with a table which includes the following columns:\
id: int\
title: varchar(255)\
description: text\
dueDate: date\
completed: tinyint(1)\

It also requires a .env file configured with the following variables:\
DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, WS_URL\
The DB variables correspond to the MySQL server you would like to use, and the WS_URL variable corresponds to the Websocket server set up in server.js. By default, this should be ws://127.0.0.1:8000

In the project directory, first run:

### `npm install`

To install the required packages, and then

### `node ./server.js`

followed by

### `npm start`

To start the server and then run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How To Use

If everything is set up correctly, the app will open on a page listing all of the tasks in your MySQL table.\
You can click on a given task to view its details in a modal window, wherein the task's completion status can be toggled.\
Clicking "Create New Task" will take you to a window where you can fill in the details of a new task. Once the new task is created, it is added to the list immediately.

Feel free to contact me if you have any issues with this application.

