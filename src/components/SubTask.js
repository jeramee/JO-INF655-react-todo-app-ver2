// SubTask.js
import React from 'react';

const SubTask = ({ description, completed, onComplete, onDelete }) => {
  return (
    <div className={`sub-task ${completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={completed} onChange={onComplete} />
      <span>{description}</span>
      <button onClick={onDelete}>Delete Sub-Task</button>
    </div>
  );
};

export default SubTask;