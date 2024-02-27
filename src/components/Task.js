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
  const [subTaskDescription, setSubTaskDescription] = useState(''); // State for sub-task description

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

<<<<<<< HEAD
=======
  const handleAddSubTask = () => {
    if (subTaskDescription.trim() !== '') {
      onAddSubTask(id, subTaskDescription);
      setSubTaskDescription(''); // Clear the input field after adding a sub-task
    }
  };

>>>>>>> 733379b (Corrected Task)
  return (
    <div className={`task ${completed ? 'completed' : ''}`} title={`Task ${id}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleComplete}
      />
<<<<<<< HEAD
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
=======
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
          {addingDescription && (
            <div>
              {/* Input field for adding sub-task description */}
              <input
                type="text"
                value={subTaskDescription}
                onChange={(e) => setSubTaskDescription(e.target.value)}
                placeholder="Sub-Task Description"
              />
              <button onClick={handleAddSubTask}>Add Sub-Task</button>
            </div>
          )}
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
      {subTasks && subTasks.length > 0 && (
        <div className="sub-tasks">
          <h4>Sub-Tasks:</h4>
          {subTasks.map((subTask) => (
            <SubTask
              key={subTask.id}
              id={subTask.id}
              description={subTask.description}
              completed={subTask.completed}
              onComplete={() => onCompleteSubTask(id, subTask.id)}
              onDelete={() => onDeleteSubTask(id, subTask.id)}
            />
          ))}
        </div>
      )}
      {isEditing && (
        <>
          {/* Save and cancel buttons during editing */}
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
>>>>>>> 733379b (Corrected Task)
        </>
      )}
      {!isEditing && (
        <>
<<<<<<< HEAD
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
=======
>>>>>>> 733379b (Corrected Task)
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
