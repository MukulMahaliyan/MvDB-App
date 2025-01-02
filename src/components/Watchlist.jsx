import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Watchlist = ({ watchlist, onRemoveFromWatchlist }) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  
  //
  if(!user){
    navigate('/login');
  }

  // useEffect(() => {
  //   if (!user) {
  //     // If the user is not logged in, redirect to login page
  //     navigate('/login');  // Redirect to '/login'
  //   }
  // }, [user, navigate]); 

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
