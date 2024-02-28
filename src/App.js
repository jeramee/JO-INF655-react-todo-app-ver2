import React, { useState, useEffect } from 'react';
import Task from './components/Task/Task';
import TaskInputForm from './components/Task/TaskInputForm';

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, onEdit: handleEditTask }]);
  };

  const handleEditTask = (taskId, newTitle, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle, description: newDescription } : task
      )
    );
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <TaskInputForm onAddTask={handleAddTask} />
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onToggleComplete={() => handleToggleComplete(task.id)}
            onDelete={() => handleDeleteTask(task.id)}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
