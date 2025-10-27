import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          {/* :imdbID is a route parameter for the unique movie ID */}
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
