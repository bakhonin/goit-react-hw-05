import css from './MovieCard.module.css';

export const MovieCard = ({ image, title, onClickImage }) => {
  return (
    <div className={css.imgCard}>
      <img className={css.imgMovie} src={image} alt={title} onClick={onClickImage} />
      <h4 className={css.titleImgCard}>{title}</h4>
    </div>
  );
};
