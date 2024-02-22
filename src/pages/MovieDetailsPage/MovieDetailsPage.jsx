import { useState, useEffect, useRef } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { Outlet, useParams, useLocation, Link } from 'react-router-dom';
import { getMovieDetails } from '../../movies-api';
import { defaultImg } from '../../assets/default-Img';
import { BackLink } from '../../components/BackLink/BackLink';
import css from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <BackLink href={backLinkRef.current ?? '/movies'}>Back to movies</BackLink>
          <div className={css.details}>
            <img
              className={css.imgDetails}
              src={
                movieDetails.backdrop_path
                  ? `https://image.tmdb.org/t/p/w200/${movieDetails.backdrop_path}`
                  : defaultImg
              }
              alt={movieDetails.title}
            />
            <ul className={css.detailsList}>
              <li>
                <h3>{movieDetails.title}</h3>
              </li>
              <li>
                <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
              </li>
              <li>
                <h5>Overview</h5>
                <p>{movieDetails.overview}</p>
              </li>
              <li>
                <h5>Genres</h5>
                {movieDetails.genres ? (
                  <p>
                    {movieDetails.genres.map((genre, index) => (
                      <span key={genre.id || index}>{genre.name}</span>
                    ))}
                  </p>
                ) : (
                  <p>No genres available</p>
                )}
              </li>
            </ul>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul className={css.listCastReview}>
              <li className={css.itemCastReview}>
                <Link className={css.linkCastReviw} to={`/movies/${movieId}/cast`}>
                  Cast
                </Link>
              </li>
              <li>
                <Link className={css.linkCastReviw} to={`/movies/${movieId}/reviews`}>
                  Review
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
