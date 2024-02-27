// SubTask.js
import React from 'react';

const SubTask = ({ id, description, completed, onComplete, onDelete }) => {
  return (
    <div className={`sub-task ${completed ? 'completed' : ''}`} title={`Sub-Task ${id}`}>
      <input type="checkbox" checked={completed} onChange={onComplete} />
      <span>{description}</span>
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default SubTask;