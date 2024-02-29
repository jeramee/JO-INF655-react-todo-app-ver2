import React, { useState, useEffect } from 'react';

const TaskInputForm = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [newSubTask, setNewSubTask] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);

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

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const module = await import('./TaskData');
        setTaskData(module.default || module);
      } catch (error) {
        console.error('Failed to load TaskData:', error);
        setTaskData([]);
      }
    };

    fetchTaskData();
  }, []); // Empty dependency array ensures that it runs only once when the component mounts

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form inputs and other elements go here */}
      
      {/* Display tasks from TaskData */}
      <div>
        <h3>Existing Tasks</h3>
        {taskData.map((task, index) => (
          <div key={index}>
            <p>ID: {task.id}</p>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
          </div>
        ))}
      </div>

      {/* Rest of your form elements go here */}
    </form>
  );
};

export default TaskInputForm;
