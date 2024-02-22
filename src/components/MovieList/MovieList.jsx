import { Link, useLocation } from 'react-router-dom';
import { MovieCard } from '../MovieCard/MovieCard';
import css from './MovieList.module.css';
import { defaultImg } from '../../assets/default-Img/';

export const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css.listMoovies}>
      {movies.map(movie => (
        <Link to={`/movies/${movie.id}`} state={location} key={movie.id} className={css.movieLink}>
          <MovieCard
            image={
              movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : defaultImg
            }
            title={movie.title}
          />
        </Link>
      ))}
    </div>
  );
};
