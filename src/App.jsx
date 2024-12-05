
import './App.css'

import React, { useState , useCallback} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchMovies } from './api.js';
import Navbar from './components/Navbar.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import Watchlist from './components/Watchlist.jsx';
import SignIn from "./components/SignIn.jsx"

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const handleSearch = React.useCallback (async (query) => {
    const result = await fetchMovies(query);
    setMovies(result);
    console.log(movies);
  },[]);


  const handleAddToWatchlist = (movie) => {
    setWatchlist((prevList) => [...prevList, movie]);
  };


  const handleRemoveFromWatchlist = (movie) => {
    setWatchlist((prevList) => prevList.filter((m) => m.id !== movie.id));
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch}/>
     
      
      <Routes> 
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} onRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/" element={
          <div className="movie-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToWatchlist={handleAddToWatchlist}
              />
            ))}
          </div>
        } />
      </Routes>
    </Router>
  );
};

// const App = () => {
//   return (
//     <>
//     <h1> Hello world</h1>
//     </>
//   )
// }


export default App;
