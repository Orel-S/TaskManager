import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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

  return (
    
    <div>
      <TaskList tasks={transformedTasks} columns={transformedColumns} />
    </div>
  );
}

export default App;