import axios from 'axios';



const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

const fetchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

export { fetchMovies, fetchMovieDetails };
