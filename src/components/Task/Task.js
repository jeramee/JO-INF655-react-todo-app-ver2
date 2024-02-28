import React, { useState } from 'react';
import './Task.css';

const Task = ({
  id,
  title,
  description,
  completed,
  subTasks,
  onToggleComplete,
  onDelete,
  onEdit,
  onAddSubTask,
  onCompleteSubTask,
  onDeleteSubTask,
  readOnly, // New prop to determine if the task is read-only
}) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addingDescription, setAddingDescription] = useState(false);
  const [subTaskDescription, setSubTaskDescription] = useState('');
  const [addingSubTask, setAddingSubTask] = useState(false);

  const handleSaveEdit = () => {
    onEdit(id, editedTitle, editedDescription, subTasks);
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

  const handleAddSubTask = () => {
    setAddingSubTask(true);
    setEditing(true);
  };

  const handleSaveSubTask = () => {
    if (subTaskDescription.trim() !== '') {
      onAddSubTask(id, subTaskDescription);
      setSubTaskDescription('');
      setAddingSubTask(false);
    }
  };

  return (
    <div className={`task ${completed ? 'completed' : ''}`} title={`Task ${id}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleComplete(id)} // Pass the taskId to onToggleComplete
        disabled={readOnly} // Disable checkbox if readOnly is true
      />
      {isEditing && (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Task Title"
            readOnly={readOnly} // Make title input readOnly if readOnly is true
          />
          <br />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Task Description"
            readOnly={readOnly} // Make description input readOnly if readOnly is true
          />
          {addingDescription && (
            <div>
              <input
                type="text"
                value={subTaskDescription}
                onChange={(e) => setSubTaskDescription(e.target.value)}
                placeholder="Sub-Task Description"
              />
              <button onClick={handleSaveSubTask}>Add Sub-Task</button>
            </div>
          )}
          {addingSubTask && (
            <div>
              <input
                type="text"
                value={subTaskDescription}
                onChange={(e) => setSubTaskDescription(e.target.value)}
                placeholder="Sub-Task Description"
              />
              <button onClick={handleSaveSubTask}>Save Sub-Task</button>
            </div>
          )}
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
          {subTasks && subTasks.length > 0 && (
            <div className="sub-tasks">
              <h4>Sub-Tasks:</h4>
              <ul>
                {subTasks.map((subTask) => (
                  <li key={subTask.id}>
                    {subTask.description}
                    <button onClick={() => onAddSubTask(id, subTask.description)}>Add Sub-Task</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {isEditing && (
        <>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
      {!isEditing && !readOnly && ( // Display edit buttons only if not in edit mode and not read-only
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleAddDescription}>Add/Edit Description</button>
          <button onClick={handleAddSubTask}>Add Sub-Task</button>
        </>
      )}
      {!readOnly && <button onClick={() => onDelete(id)}>X</button>} {/* Display delete button only if not read-only */}
    </div>
  );
};

export default Task;
