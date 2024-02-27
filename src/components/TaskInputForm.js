// TaskInputForm.js
import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState(''); // Add state for sub-task

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskDescription.trim() && subTaskDescription.trim()) {
      onAddTask(taskDescription, subTaskDescription);
      setTaskDescription('');
      setSubTaskDescription('');
    } else {
      alert('Task and Sub-Task descriptions cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="text"
        value={subTaskDescription}
        onChange={(e) => setSubTaskDescription(e.target.value)}
        placeholder="Add a sub-task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
