import axios from 'axios';

const API_KEY = 'eb5cdc7d9c322e357b5c8f9c3e5c0e6b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const options = {
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
};

export const getImageUrl = posterPath => `${IMAGE_BASE_URL}/${posterPath}`;

export const handleResponse = (response, path) => {
  return response.data.results.map(item => ({
    ...item,
    poster_url: getImageUrl(item[path]),
  }));
};

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, options);
    return handleResponse(response, 'poster_path');
  } catch (error) {
    throw new Error(`Error fetching trending movies: ${error}`);
  }
};

export const searchMovies = async query => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      ...options,
      params: { ...options.params, page: 1, query },
    });
    return handleResponse(response, 'poster_path');
  } catch (error) {
    throw new Error(`Error searching movies: ${error}`);
  }
};

export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, options);
    return { ...response.data, poster_url: getImageUrl(response.data.poster_path) };
  } catch (error) {
    throw new Error(`Error fetching movie details: ${error}`);
  }
};

export const getMovieCredits = async movieId => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
    return response.data ? response.data : { cast: [] };
  } catch (error) {
    throw new Error(`Error fetching movie credits: ${error}`);
  }
};

export const getMovieReviews = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`,
      options
    );
    return response.data.results;
  } catch (error) {
    throw new Error(`Error fetching movie reviews: ${error}`);
  }
};
