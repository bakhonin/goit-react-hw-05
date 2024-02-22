import { useState, useEffect } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { toast } from 'react-hot-toast';
import { getTrendingMovies } from '../../movies-api';
import { MovieList } from '../../components/MovieList/MovieList';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchMovies = async () => {
      setError(false);
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
        setIsLoading(false);
      } catch (error) {
        toast.error('Oops, there was an error fetching trending movies. Please try reloading 😭');
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h1 className={css.titleHomePage}>Trending today</h1>
      {error && <ErrorMessage message={error} />}
      {!isLoading && trendingMovies && trendingMovies.length > 0 && (
        <MovieList movies={trendingMovies} />
      )}
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
