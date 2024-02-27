// App.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import Task from './components/Task';
import TaskInputForm from './components/TaskInputForm';

// App component manages the overall application state and renders Task components
const App = () => {
  // State to manage the list of tasks, initialized from localStorage or an empty array
  // const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState('');

  // Function to add a new task to the list
  const handleAddTask = (taskDescription, subTaskDescription) => {
    const newTask = {
      id: uuidv4(),
      title: taskDescription,
      description: subTaskDescription,
      completed: false,
      subTasks: [],
    };
  
    setTasks([...tasks, newTask]);
    // Clear input fields after adding the task
    setTaskDescription('');
    setSubTaskDescription('');
  };
  

// Function to add a sub-task to an existing task
const handleAddSubTask = (taskId, subTaskDescription) => {
  setTasks(
    tasks.map((task) =>
      task.id === taskId
        ? { ...task, subTasks: [...task.subTasks, { id: uuidv4(), description: subTaskDescription, completed: false }] }
        : task
    )
  );
};
  

  // Function to mark a sub-task as completed or not completed
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

  // Function to delete a sub-task from an existing task
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

  // Function to edit an existing task in the list
  const handleEditTask = (index, newTitle, newDescription) => {
    // Updating the title and description of the task at the specified index
    const updatedTasks = [...tasks];
    updatedTasks[index].title = newTitle;
    updatedTasks[index].description = newDescription;
    setTasks(updatedTasks);
  };

  // Function to toggle the completion status of a task
  const handleToggleComplete = (index) => {
    // Toggling the completed status of the task at the specified index
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Function to delete a task from the list
  const handleDeleteTask = (index) => {
    // Removing the task at the specified index from the list
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Effect to persist tasks in localStorage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      {/* TaskInputForm component for adding new tasks */}
      <TaskInputForm onAddTask={handleAddTask} />
      <div>
        {/* Mapping over tasks to render individual Task components */}
        {tasks.map((task, index) => {
          console.log("Rendering Task:", task); // Check if this log statement appears in the console
          return (
            <Task
              key={index}
              id={index}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onToggleComplete={() => handleToggleComplete(index)}
              onDelete={() => handleDeleteTask(index)}
              onEdit={handleEditTask}
              onAddSubTask={(subTaskDescription) => handleAddSubTask(index, subTaskDescription)}
              onCompleteSubTask={(subTaskId) => handleCompleteSubTask(index, subTaskId)}
              onDeleteSubTask={(subTaskId) => handleDeleteSubTask(index, subTaskId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
