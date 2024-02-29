import React, { useState } from 'react';
import './Task.css';

const Task = ({ id, title, description, completed, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addingDescription, setAddingDescription] = useState(false);

  const handleSaveEdit = () => {
    onEdit(id, editedTitle, editedDescription);
    setEditing(false);
    setAddingDescription(false);
  };

  const handleAddDescription = () => {
    setAddingDescription(true);
    setEditing(true);
  };

  const handleTitleClick = () => {
    if (!isEditing) {
      alert(description);
    }
  };

  return (
    <div className={`task ${completed ? 'completed' : ''}`} title={`Task ${id}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleComplete}
      />
      {isEditing && (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task Title"
          />
          <br />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Task Description"
          />
        </>
      )}
      {!isEditing && (
        <>
          <h3 onClick={handleTitleClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {title}
          </h3>
          {description && (
            <span style={{ display: 'none' }}>{description}</span>
          )}
        </>
      )}
      {isEditing && (
        <>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
      {!isEditing && (
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleAddDescription}>Add/Edit Description</button>
        </>
      )}
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default Task;
