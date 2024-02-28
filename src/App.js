import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Task from './components/Task/Task';
import TaskInputForm from './components/Task/TaskInputForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState('');

  const handleAddTask = () => {
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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          description={task.description}
          subTasks={task.subTasks}
          onEdit={handleEditTask}
          onAddSubTask={handleAddSubTask}
          onToggleComplete={() => handleToggleComplete(task.id)}
          onDelete={() => handleDeleteTask(task.id)}
          onCompleteSubTask={handleCompleteSubTask}
          onDeleteSubTask={handleDeleteSubTask}
        />
      ))}

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
