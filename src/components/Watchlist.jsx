import React from 'react';

const Watchlist = ({ watchlist, onRemoveFromWatchlist }) => {
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
