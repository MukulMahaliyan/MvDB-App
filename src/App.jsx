
import React, { useState , useCallback} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchMovies } from './api.js';
import Navbar from './components/Navbar.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import Watchlist from './components/Watchlist.jsx';
import Login from './components/Login.jsx';
import { Footer } from './components/Footer.jsx';


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

      <div className='min-h-screen flex flex-col'> 
        
      <header>
      <Navbar onSearch={handleSearch}/>
      </header>
     
      <section className='flex-grow-1'>
      <Routes> 
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} onRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={
          <div className="flex w-full flex-wrap justify-around">
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
     </section>
    
    <footer>
      <Footer/>
    </footer>

    </div>

    </Router>


  );
};


export default App;
