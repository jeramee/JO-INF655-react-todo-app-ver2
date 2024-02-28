import React from 'react';
import Task from './Task';

const TaskList = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEdit,
  onAddSubTask,
  onCompleteSubTask,
  onDeleteSubTask,
}) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            subTasks={task.subTasks}
            onToggleComplete={() => onToggleComplete(index)}
            onDeleteTask={() => onDeleteTask(index)}
            onEdit={(newTitle, newDescription) => onEdit(task.id, newTitle, newDescription)}
            onAddSubTask={() => onAddSubTask(index)}
            onCompleteSubTask={(subTaskId) => onCompleteSubTask(index, subTaskId)}
            onDeleteSubTask={(subTaskId) => onDeleteSubTask(index, subTaskId)}
        />
      ))}
    </div>
  );
};

export default TaskList;
