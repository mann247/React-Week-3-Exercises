import React from 'react';
import TaskItem from '../components/TaskItem';

const TaskList = ({tasks, deleteTask, updateTask}) => {
    return (
    <div className="task-list">
      <h2>My Tasks ({tasks.filter(t => !t.completed).length} remaining)</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet! Add one above. 🚀</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              deleteTask={deleteTask} 
              updateTask={updateTask} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;