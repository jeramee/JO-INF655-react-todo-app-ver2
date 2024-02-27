// App.js
import React, { useState, useEffect } from 'react';
import Task from './components/Task';
import TaskInputForm from './components/TaskInputForm';

// App component manages the overall application state and renders Task components
const App = () => {
  // State to manage the list of tasks, initialized from localStorage or an empty array
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  // Function to add a new task to the list
  const handleAddTask = (newTask) => {
    // Adding the new task to the list with an onEdit function
    setTasks([...tasks, { ...newTask, onEdit: handleEditTask }]);
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
        {tasks.map((task, index) => (
          <Task
            key={index}
            id={index}  
            title={task.title}
            description={task.description}
            completed={task.completed}
            onToggleComplete={() => handleToggleComplete(index)}
            onDelete={() => handleDeleteTask(index)}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
