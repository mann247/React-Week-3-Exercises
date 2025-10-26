// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { initialTasks } from './data/initialTasks';
import TaskList from './pages/TaskList';
import TaskDetail from './pages/TaskDetail';
import TaskForm from './components/TaskForm';
// import Header from './components/Header';
import './App.css';


const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const App = () => {
  const [tasks, setTasks] = useLocalStorage('todo-hard-react', initialTasks);



  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(), // Simple unique ID
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };


  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            {/* Task List Page */}
            <Route
              path="/"
              element={
                <>
                  <TaskForm onSubmit={addTask} isNew={true} />
                  <TaskList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
                </>
              }
            />
            {/* Task Detail Page (View/Edit) */}
            <Route
              path="/tasks/:taskId"
              element={<TaskDetail tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />}
            />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<h2 style={{textAlign:'center', marginTop: '20px'}}>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;