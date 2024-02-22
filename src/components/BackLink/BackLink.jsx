import css from './BackLink.module.css';
import { Link } from 'react-router-dom';

export const BackLink = ({ href, children }) => {
  return (
    <Link to={href} className={css.BackLink}>
      {children}
    </Link>
  );
};
