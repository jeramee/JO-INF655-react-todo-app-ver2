// ./components/Task/Tasks.js

import React from "react";
import Task from "./Task";

export default function Tasks({ taskList, handelDelete, handelChecked }) {
  return (
    <>
      {taskList.length ? (
        <div>
          {taskList.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              handelDelete={handelDelete}
              checked={task.checked}
              handelChecked={handelChecked}
            />
          ))}
        </div>
      ) : (
        <p>Task List is empty</p>
      )}
    </>
  );
}
