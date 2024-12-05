import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const [url, setUrl]= useState()
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <Link to={`/movie/${movie.id}`}>  <h3>{movie.title}</h3> </Link>
      <button onClick={() => onAddToWatchlist(movie)}>Add to Watchlist</button>
    </div>
  );
};

export default MovieCard;
