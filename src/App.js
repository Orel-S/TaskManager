import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Button from '@mui/material/Button';
import wsClient, { InitClient } from './api/wsClient';

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currTask, setCurrTask] = useState({});
  const ws = new WebSocket('ws://127.0.0.1:8000');

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
    console.log("sent a message to the server",{apiCall});
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      console.log('received a message from the server', json);
      
      if ((json.event = "data")) {
        setTasks(json);
        console.log(json.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // fetchTasks();
  }, []);

  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/get');
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  const transformedTasks = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      completed: task.completed,
    };
  });

  //Fetch columns instead of hardcoding if they may change
  const transformedColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'completed', headerName: 'Completed', width: 120 },
  ];

  //initialize websocket client
  wsClient();

  const handleTaskClick = (task) => {
    setCurrTask(task);
    console.log("handleTaskClick",{task});
    setOpen(true);
  };

  return (
    
    <div>
      <TaskList tasks={transformedTasks} columns={transformedColumns} onTaskClick={handleTaskClick} />
      <Button onClick={()=>setOpen(true)}>Detailed Task Info</Button>
      <TaskModal open={open} handleClose={()=> setOpen(false) } task={currTask.row}/>
      
    </div>
  );
}

export default App;