import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div>
      <Link className={css.linkBackHome} to="/">
        Back to home page
      </Link>
      <h1>Opps, sorry :(</h1>
    </div>
  );
}

export default NotFoundPage;
