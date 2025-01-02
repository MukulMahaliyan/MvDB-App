import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const MovieCard = ({ movie, onAddToWatchlist }) => {
  const [url, setUrl]= useState()
  const {user, enqueueAction} = useAuth();
  const handleAddToWatchlist = () => {
    if(!user){
      enqueueAction((movie) => onAddToWatchlist(movie));
    }
    else{
      onAddToWatchlist(movie);
    }

  }

  return (
    <div className='inline-block m-4 w-1/5 h-auto min-w-28'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title} className='w-auto h-3/4'
      />
      <Link to={`/movie/${movie.id}`}>  <h3 className='w-auto'>{movie.title}</h3> </Link>
      <button className='text-blue-700 hover:text-white border border-blue-700
                     hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                     text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'
               onClick={handleAddToWatchlist}>Add to Watchlist</button>
    </div>
  );
};

export default MovieCard;
