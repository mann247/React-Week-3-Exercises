
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;


function MovieDetail() {
  const { imdbID } = useParams(); // Gets the 'imdbID' from the URL path
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      setError("Configuration Error: OMDb API Key is missing.");
      setLoading(false);
      return;
    }

    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}&i=${imdbID}&plot=full`);
        
        if (response.data.Response === "True") {
          setMovie(response.data);
          setError(null);
        } else {
          setError(response.data.Error || 'Movie details not found.');
          setMovie(null);
        }
      } catch (err) {
        console.error('Error fetching movie detail:', err);
        setError('An error occurred while fetching details.');
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetail();
    } else {
        setError("No Movie ID provided.");
        setLoading(false);
    }
  }, [imdbID]);


  
  if (loading) {
    return <div className="movie-detail app-container">Loading movie details...</div>;
  }

  if (error) {
    return <div className="movie-detail app-container error-message">Error: {error}</div>;
  }

  return (
    <div className="movie-detail app-container">
      <h1>{movie.Title}</h1>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} 
        alt={movie.Title} 
      />
      
      <h2>Plot</h2>
      <p>{movie.Plot}</p>
      
      <h2>Details</h2>
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
      
      <button type="submit" onClick={() => window.history.back()}>Back to Search</button>
      
    </div>
  );
}
export default MovieDetail;