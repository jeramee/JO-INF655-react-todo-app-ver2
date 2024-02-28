import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Task from './components/Task/Task';
import TaskInputForm from './components/Task/TaskInputForm';

const App = () => {
  const bobTaskUUID = '123e4567-e89b-12d3-a456-426614174001';
  const bobSubTasks = [
    { id: 1, description: 'Bob1' },
    { id: 2, description: 'Bob2' },
    { id: 3, description: 'Bob3' },
    { id: 4, description: 'Bob4' },
    { id: 5, description: 'Bob5' },
  ];

  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      title: 'Bob',
      description: 'About Bob',
      completed: false,
      subTasks: bobSubTasks,
    },
  ]);

  const [taskDescription, setTaskDescription] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState('');

  const handleAddTask = (taskDescription, subTaskDescription) => {
    const newTask = {
      id: uuidv4(),
      title: taskDescription,
      description: subTaskDescription,
      completed: false,
      subTasks: [],
    };

    setTasks([...tasks, newTask]);
    setTaskDescription('');
    setSubTaskDescription('');
  };

  const handleAddSubTask = (taskId, subTaskDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: [
                ...task.subTasks,
                { id: uuidv4(), description: subTaskDescription, completed: false },
              ],
            }
          : task
      )
    );
  };

  const handleCompleteSubTask = (taskId, subTaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.map((subTask) =>
                subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
              ),
            }
          : task
      )
    );
  };

  const handleDeleteSubTask = (taskId, subTaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks.filter((subTask) => subTask.id !== subTaskId),
            }
          : task
      )
    );
  };

  const handleEditTask = (taskId, newTitle, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    );
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Check if task is defined before accessing its properties
        const completed = task.completed !== undefined ? !task.completed : false;
        return { ...task, completed };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <Task
        title="Bob"
        description="About Bob"
        subTasks={bobSubTasks}
        onEdit={handleEditTask}
        onAddSubTask={handleAddSubTask}
        onToggleComplete={handleToggleComplete}  
        onDelete={handleDeleteTask}
        onCompleteSubTask={handleCompleteSubTask}
        onDeleteSubTask={handleDeleteSubTask}
      />
      <TaskInputForm onAddTask={handleAddTask} />
      <header>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>   
    </div>
  );
};

export default App;
