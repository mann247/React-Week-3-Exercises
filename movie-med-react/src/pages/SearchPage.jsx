import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    // Initial check for API key
    if (!API_KEY) {
        setLoading(false);
        setError("Configuration Error: OMDb API Key is missing. Check your .env file."); 
        return;
    }

    try {
      const response = await axios.get(`${BASE_API_URL}&s=${query}`);
      
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        // OMDb returns Response: "False" and an Error property if no results or error
        setError(response.data.Error || 'No results found.');
        setMovies([]);
      }
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Display Errors and Loading state */}
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading results...</p>}

      {/* Display Results */}
      <div className="results-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title} />
            <h3>{movie.Title} ({movie.Year})</h3>
            {/* Link to the detailed view using the movie's unique IMDb ID */}
            <Link to={`/movie/${movie.imdbID}`}>View Details</Link> 
          </div>
        ))}
      </div>
    </div>
  );
}
export default SearchPage;