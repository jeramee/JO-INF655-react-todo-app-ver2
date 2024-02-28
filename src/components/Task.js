// Task.js
import React, { useState } from 'react';
import SubTask from './SubTask'; // Import SubTask component
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import './Task.css';

const Task = ({ id, title, description, completed, subTasks, onToggleComplete, onDelete, onEdit, onAddSubTask, onCompleteSubTask, onDeleteSubTask }) => {
  console.log("Rendering Task:", title, description, subTasks);  
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [addingDescription, setAddingDescription] = useState(false);
  const [subTaskDescription, setSubTaskDescription] = useState('');
  const [addingSubTask, setAddingSubTask] = useState(false);

  const handleSaveEdit = () => {
    console.log('Saving Task Edit:', editedTitle, editedDescription);
    onEdit(id, editedTitle, editedDescription);  // Ensure onEdit is correctly passed
    setEditing(false);
    setAddingDescription(false);
  };
  

  const handleAddDescription = () => {
    console.log('Adding Task Description:', editedDescription);
    setAddingDescription(true);
    setEditing(true);
  };

  const handleTitleClick = () => {
    if (!isEditing) {
      alert(description);
    }
  };

  const handleAddSubTask = () => {
    console.log('Adding Sub-Task:', subTaskDescription);
    setAddingSubTask(true);
    setEditing(true);
  };

  const handleSaveSubTask = () => {
    console.log('Saving Sub-Task:', subTaskDescription);
    if (subTaskDescription.trim() !== '') {
      onAddSubTask(id, subTaskDescription);
      setSubTaskDescription('');
      setAddingSubTask(false);
    }
  };

  return (
    <div className={`task ${completed ? 'completed' : ''}`} title={`Task ${id}`}>      <input
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
          {/* Displaying sub-tasks in a list */}
          {subTasks && subTasks.length > 0 && (
            <div className="sub-tasks">
              <h4>Sub-Tasks:</h4>
              <ul>
                {subTasks.map((subTask) => (
                  <SubTask key={subTask.id} subTaskDescription={subTask.description} />
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
      {!isEditing && (
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleAddDescription}>Add/Edit Description</button>
          <button onClick={handleAddSubTask}>Add Sub-Task</button>
        </>
      )}
      <button onClick={onDelete}>X</button>
    </div>
  );
};

export default Task;
