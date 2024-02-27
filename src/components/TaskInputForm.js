// TaskInputForm.js
import React, { useState } from 'react';

const TaskInputForm = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState(''); // New state for sub-task description

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleSubTaskDescriptionChange = (e) => {
    setSubTaskDescription(e.target.value);
  };

  const handleAddTask = () => {
    // Pass both task and sub-task descriptions to onAddTask
    onAddTask(taskDescription, subTaskDescription);
    // Clear input fields after adding the task
    setTaskDescription('');
    setSubTaskDescription('');
  };

  return (
    <div>
      {/* Input field for task description */}
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={handleTaskDescriptionChange}
      />
      {/* Input field for sub-task description */}
      <input
        type="text"
        placeholder="Sub-Task Description"
        value={subTaskDescription}
        onChange={handleSubTaskDescriptionChange}
      />
      {/* Button to add task */}
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInputForm;
