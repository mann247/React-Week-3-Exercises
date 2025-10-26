// src/pages/TaskDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const TaskDetail = ({ tasks, updateTask, deleteTask }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === taskId);
  
  const [isEditing, setIsEditing] = useState(false);

  if (!task) {
    return <h2 style={{textAlign:'center', marginTop: '20px'}}>Task Not Found!</h2>;
  }

  const handleUpdate = (updatedTask) => {
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(task.id);
      navigate('/'); // Navigate back to the list after deletion
    }
  };

  return (
    <div className="task-detail-page">
      {isEditing ? (
        <TaskForm 
          initialTask={task} 
          onSubmit={handleUpdate} 
          isNew={false}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="task-view">
          <h2>{task.title}</h2>
          <p className="status">Status: 
            <strong> {task.completed ? 'Completed 🎉' : 'Pending ⏳'}</strong>
          </p>
          <p className="description">{task.description || 'No description provided.'}</p>
          <div className="actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Task</button>
            <button onClick={handleDelete} className="delete-btn">Delete Task</button>
            <button onClick={() => navigate('/')} className="back-btn">← Back to List</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;