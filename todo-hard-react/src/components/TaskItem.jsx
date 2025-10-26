import React from 'react';
import {Link} from 'react-router-dom';

const TaskItem = ({ task, deleteTask, updateTask }) => {
  const { id, title, completed } = task;

  const handleToggle = () => {
    updateTask({ ...task, completed: !completed });
  };

  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />
      
      <Link to={`/tasks/${id}`} className="task-title-link">
        {title}
      </Link>
      
      <button onClick={() => deleteTask(id)} className="delete-btn">
        &times;
      </button>
    </li>
  );
};

export default TaskItem;