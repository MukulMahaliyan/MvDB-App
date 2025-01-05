import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Watchlist = ({ watchlist, onRemoveFromWatchlist }) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  
  
  useEffect( ()=>{
    const goToLogin =  () => {
    if (!user) {
      // If the user is not logged in, redirect to login page
      alert("Login to add movies to Watchlist");
     // navigate('/login');  // Redirect to '/login'
    }
  }
   goToLogin();
    
  },[user]);

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <button onClick={() => onRemoveFromWatchlist(movie)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
