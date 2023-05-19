import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Button from '@mui/material/Button';
import NewTask from './components/NewTask';
import { initConnection, sendMessage } from './api/wsClient';
import { Container, TextLabel, Frame } from './styles/styles';

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(true);
  };

  const handleNewTask = (task) => {
    const newTask = { ...task, isNew: true };
    sendMessage(JSON.stringify(newTask));
    setIsNewTaskOpen(false);
  };

  const handleTaskComplete = (task) => {
    const updatedTask = { ...task, isNew: false };
    sendMessage(JSON.stringify(updatedTask));
    setModalOpen(false);
  };

  return (
    <Container bgColor='blue'>
      <Frame height='100%' width='100%' bgColor='#bdc3c7'>
        <TextLabel bold={true} size={30} color="blue">{!isNewTaskOpen ? "Task List" : "Create New Task"}</TextLabel>
      </Frame>
      {isNewTaskOpen && <NewTask handleClose={() => setIsNewTaskOpen(false)} handleNewTask={handleNewTask} />}
      {!isNewTaskOpen && <Frame height='80%' width='80%'>
        <TaskList tasks={transformedTasks} columns={transformedColumns} onTaskClick={handleTaskClick} />
        <TaskModal open={modalOpen} handleClose={() => setModalOpen(false)} handleComplete={() => handleTaskComplete(currTask.row)} task={currTask.row} />
        <Button style={{ margin: 10, alignSelf: "start" }} variant="outlined" onClick={() => setIsNewTaskOpen(true)}>Create New Task</Button>
      </Frame>}
    </Container>
  );
}

export default App;