// TaskInputForm.js
import React, { useState } from 'react';

const TaskInputForm = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [newSubTask, setNewSubTask] = useState('');
  const [subTasks, setSubTasks] = useState([]);

  const handleAddSubTask = () => {
    if (newSubTask.trim() !== '') {
      setSubTasks([...subTasks, { description: newSubTask, completed: false }]);
      setNewSubTask('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      onAddTask({
        title: taskTitle,
        description: taskDescription,
        completed: false,
        subTasks: [...subTasks],
      });

      setTaskTitle('');
      setTaskDescription('');
      setSubTasks([]);
      setNewSubTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <br />
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Enter task description"
      />
      <br />
      {/* Sub-tasks */}
      {subTasks.map((subTask, index) => (
        <div key={index}>
          <input type="checkbox" checked={subTask.completed} readOnly />
          {subTask.description}
        </div>
      ))}
      <input
        type="text"
        value={newSubTask}
        onChange={(e) => setNewSubTask(e.target.value)}
        placeholder="Add Sub-Task"
      />
      <button type="button" onClick={handleAddSubTask}>
        Add Sub-Task
      </button>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInputForm;
