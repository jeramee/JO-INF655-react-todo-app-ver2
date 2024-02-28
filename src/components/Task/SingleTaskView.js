// ./components/Task/SingleTaskView.js
import React from 'react';
import Task from './Task';
import TaskData from './TaskData';

const SingleTaskView = ({ match }) => {
  const taskId = parseInt(match.params.id, 10);
  const task = TaskData.find((task) => task.id === taskId);

  if (!task) {
    return <div>Task not found!</div>;
  }

  return (
    <div>
      <h1>Single Task View</h1>
      <Task
        id={task.id}
        title={task.title}
        description={task.description}
        completed={task.checked}
        subTasks={[]} // Assuming there are no sub-tasks in TaskData.js
        onToggleComplete={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        onAddSubTask={() => {}}
        onCompleteSubTask={() => {}}
        onDeleteSubTask={() => {}}
      />
    </div>
  );
};

export default SingleTaskView;

