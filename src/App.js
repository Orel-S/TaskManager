import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Button from '@mui/material/Button';
import NewTask from './components/NewTask';
import { initConnection, sendMessage } from './api/wsClient';

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [currTask, setCurrTask] = useState({});
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  useEffect(() => {
    initConnection(setTasks);
  }, []);

  const transformedTasks = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: (new Date(task.dueDate)).toDateString(),
      completed: task.completed ? "Yes" : "No",
    };
  });

  //Fetch columns instead of hardcoding if they may change
  const transformedColumns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    { field: 'completed', headerName: 'Completed', width: 120 },
  ];

  const handleTaskClick = (task) => {
    setCurrTask(task);
    console.log("handleTaskClick", { task });
    setOpen(true);
  };

  const handleNewTask = (task) => {
    console.log("handleNewTask", { task });
    sendMessage(JSON.stringify(task));
    setIsNewTaskOpen(false);
  };

  return (
    <div>
      {isNewTaskOpen && <NewTask handleClose={() => setIsNewTaskOpen(false)} handleNewTask={handleNewTask} />}
      {!isNewTaskOpen && <>
        <TaskList tasks={transformedTasks} columns={transformedColumns} onTaskClick={handleTaskClick} />
        <Button onClick={() => setIsNewTaskOpen(true)}>Create New Task</Button>
        <TaskModal open={open} handleClose={() => setOpen(false)} task={currTask.row} />
      </>}
    </div>
  );
}

export default App;