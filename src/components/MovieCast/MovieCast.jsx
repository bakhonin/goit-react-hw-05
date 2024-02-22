import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../movies-api';
import { defaultImg } from '../../assets/default-Img';
import css from './MovieCast.module.css';
import { Loader } from '../Loader/Loader';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await getMovieCredits(movieId);
        setMovieData(movieResponse);
        if (movieResponse && Array.isArray(movieResponse.cast)) {
          setCast(movieResponse.cast);
        } else {
          console.error('Invalid cast data:', movieResponse);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [movieId]);

  if (!movieData) {
    return <Loader />;
  }

  return (
    <div className={css.castContainer}>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li className={css.castItem} key={`${actor.id}-${actor.character}`}>
            <img
              className={css.castImage}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : defaultImg
              }
              alt={actor.name}
              width="200px"
            />
            <p className={css.castName}>{actor.name}</p>
            <p className={css.castCharacter}>{actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
