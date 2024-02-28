import React from 'react';
import Task from './Task';

const TaskList = ({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAddSubTask,
  onCompleteSubTask,
  onDeleteSubTask,
}) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task
            key={task.id}
            index={index}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEdit={onEditTask}  // Pass onEdit as a prop
            onAddSubTask={onAddSubTask}
            onCompleteSubTask={onCompleteSubTask}
            onDeleteSubTask={onDeleteSubTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
