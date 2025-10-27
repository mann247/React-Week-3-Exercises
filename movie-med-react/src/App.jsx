import React from 'react';
import Navbar from './components/Navbar'
import './App.css';

const App = () => {
  return (
    <div className='app'>
        <Navbar />
        <main><MovieList /></main>
    </div>
  );
};

export default App;
