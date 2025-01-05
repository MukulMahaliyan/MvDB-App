
import React, { useState , useCallback, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchMovies } from './api.js';
import Navbar from './components/Navbar.jsx';
import MovieCard from './components/MovieCard.jsx';
import MovieDetail from './components/MovieDetail.jsx';
import Watchlist from './components/Watchlist.jsx';
import Login from './components/Login.jsx';
import { Footer } from './components/Footer.jsx';
import Register from './components/Register.jsx';
import axios from 'axios';
import AuthContext from './AuthContext.jsx';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const {user} = useContext(AuthContext);

  const handleSearch = React.useCallback (async (query) => {
    const result = await fetchMovies(query);
    setMovies(result);
    console.log(movies);
  },[]);


  const handleAddToWatchlist = (movie) => {
    setWatchlist((prevList) => [...prevList, movie]);
  };

   // save watchlist
  useEffect(() =>{
    async function saveWatchlist(){
    if(user){
      try{
        const token = localStorage.getItem('token');
        console.log(token);

    const response = axios.post(`${SERVER_URL}user/watchlist`,{watchlist}, {headers: { Authorization: token }});
        console.log(response.data.message);
       // setWatchlist(response.data.message);
      }
      catch(err){
        console.log(err);
      }
    }
  }
  saveWatchlist();
  },[watchlist]);
  
// fetch watch list for user
  useEffect( ()=>{
    async function fetchWatchlist(){
    if (user) {
      try{
      const token = localStorage.getItem('token');
      const response = await axios.get(`${SERVER_URL}user/watchlist`,{headers: { Authorization: token }});
      console.log(response);
      setWatchlist(response.data.watchlist);
      }
      catch(err){
        console.log(err);
      }
      
    }
    else{
      setWatchlist([]);
    }
  }
  fetchWatchlist();
  },[user]);

  const handleRemoveFromWatchlist = (movie) => {
    setWatchlist((prevList) => prevList.filter((m) => m.id !== movie.id));
  };

  return (
      
      <div className='min-h-screen flex flex-col'> 
        
      <header>
      <Navbar onSearch={handleSearch}/>
      </header>
     
      <section className='flex-grow-1'>
      <Routes> 
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} onRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
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

    


  );
};


export default App;
