import { toast } from 'react-hot-toast';
import { Loader } from '../../components/Loader/Loader';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movies-api';
import { MovieList } from '../../components/MovieList/MovieList';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { BackLink } from '../../components/BackLink/BackLink';
import css from './MoviesPage.module.css';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

const MoviesPage = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const backLinkRef = useRef(location.state);

  const changeSearch = newSearch => {
    searchParams.set('search', newSearch);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const controller = new AbortController();
    const queryParams = new URLSearchParams(location.search);
    const queryParamSearch = queryParams.get('search') ?? '';
    if (queryParamSearch) {
      handleSearch(queryParamSearch);
    } else {
      setSearchResults([]);
    }

    async function fetchData() {
      try {
        const results = await searchMovies(queryParamSearch, {
          abortController: controller,
        });
        setSearchResults(results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [location.search]);

  const handleSearch = async query => {
    try {
      setLoading(true);
      setError(false);
      const results = await searchMovies(query, { abortController: new AbortController() });
      setSearchResults(results);
      if (results.length === 0) {
        toast.error('No movies found! 😞');
      }
    } catch (error) {
      if (error.code !== 'ERR_CANCELED') {
        setError(true);
      } else {
        toast.error('Oops, there was an error, please try reloading 😭');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BackLink href={backLinkRef.current ?? '/'}>Back to home page</BackLink>
      <div className={css.search}>
        <SearchForm onSubmit={changeSearch} />
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {searchResults.length > 0 && <MovieList movies={searchResults} />}
      </div>
    </div>
  );
};

export default MoviesPage;
