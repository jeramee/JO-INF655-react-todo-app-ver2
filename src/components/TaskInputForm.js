// TaskInputForm.js
import React, { useState } from 'react';

// TaskInputForm component represents the form for adding new tasks
const TaskInputForm = ({ onAddTask }) => {
  // State to manage the input for task title
  const [taskTitle, setTaskTitle] = useState('');
  // State to manage the input for task description
  const [taskDescription, setTaskDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Checking if both task title and task description are not empty
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      // Calling the onAddTask function with the new task object
      onAddTask({ title: taskTitle, description: taskDescription, completed: false });
      // Resetting the input values after adding the task
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for task title */}
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <br /> {/* Add a line break */}
      {/* Input field for task description */}
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Enter task description"
      />
      {/* Submit button to add a new task */}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInputForm;
