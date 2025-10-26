import React, {useState, useEffect} from 'react';

const TaskForm = ({ onSubmit, initialTask = {title: '', description: '' }, isNew = true, onCancel}) => {
    const [task, setTask] = useState(initialTask);
    const {title, description} = task;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim()){
            onSubmit(task);
            if (isNew){
                setTask({title: '', description: ''});
            }
        }
    };

    return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3 style={{marginBottom: '10px'}}>{isNew ? 'Add New Task' : 'Edit Task'}</h3>
      <input
        type="text"
        name="title"
        placeholder="Task Title (required)"
        value={title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={description}
        onChange={handleChange}
      />
      <button type="submit">{isNew ? 'Create Task' : 'Save Changes'}</button>
      {onCancel && <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>}
    </form>
  );
};

export default TaskForm;