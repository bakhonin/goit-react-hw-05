import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../movies-api';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {reviews.length === 0 ? (
        <p>We don&rsquo;t have any reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h5>Author: {review.author}</h5>
              <p> {review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
