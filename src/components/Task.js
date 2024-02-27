// Task.js
import React, { useState } from 'react';
import './Task.css';

// Task component represents a single task in the to-do list
const Task = ({ id, title, description, completed, onToggleComplete, onDelete, onEdit }) => {
  // State variables to manage editing state and input values
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addingDescription, setAddingDescription] = useState(false);

  // Function to handle saving edits
  const handleSaveEdit = () => {
    onEdit(id, editedTitle, editedDescription);
    setEditing(false);
    setAddingDescription(false);
  };

  // Function to handle adding/editing description
  const handleAddDescription = () => {
    setAddingDescription(true);
    setEditing(true);
  };

  // Function to handle click on task title, displaying description
  const handleTitleClick = () => {
    if (!isEditing) {
      alert(description); // Displaying description when title is clicked
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
          {/* Input fields for editing title and description */}
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
          {/* Displaying title as clickable with underline style */}
          <h3 onClick={handleTitleClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {title}
          </h3>
          {/* Displaying description in a hidden span */}
          {description && (
            <span style={{ display: 'none' }}>{description}</span>
          )}
        </>
      )}
      {isEditing && (
        <>
          {/* Save and cancel buttons during editing */}
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
      {!isEditing && (
        <>
          {/* Edit and add/edit description buttons when not editing */}
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleAddDescription}>Add/Edit Description</button>
        </>
      )}
      {/* Delete button for task */}
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default Task;
