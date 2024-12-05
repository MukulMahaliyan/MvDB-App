import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../api';


// adult
// : 
// false
// backdrop_path
// : 
// null
// genre_ids
// : 
// (2) [18, 10749]
// id
// : 
// 15155
// original_language
// : 
// "en"
// original_title
// : 
// "G"
// overview
// : 
// "A young Hip Hop star named Summer G falls for a middle to upper class sister while in college. After she rejects him for a fellow social climber, Summer G spends ten years building a Hip Hop empire, then moves to the Hamptons where he finds the object of his affections."
// popularity
// : 
// 8.464
// poster_path
// : 
// "/czh2JpMJY4Y2kzSi3Zd2x6lp6Xs.jpg"
// release_date
// : 
// "2002-05-10"
// title
// : 
// "G"
// video
// : 
// false
// vote_average
// : 
// 6.507
// vote_count
// : 
// 141
export const MovieDetail = ( {movies}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
   
    //find in the current movies state
    const result = movies.find(movie => movie.id==id);
    
    // use api to fetch movie detail 
    if(!result){

      const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      };

    getMovieDetails();
    }
    else setMovie(result);


  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p> {movie.release_date}</p>
      <p> IMDB RATING - {movie.vote_average} </p>
    </div>
  );
};

export default MovieDetail;
