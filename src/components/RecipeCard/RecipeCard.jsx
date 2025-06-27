
import styles from './RecipeCard.module.css';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RecipeCard = ({ recipe, onToggleFavorite }) => {
  const { _id, thumb, title, description, calories, isFavorite,  time } = recipe;
  const isLoggedIn = useSelector(() => true); // потом добавь вместо функции true, selectIsLoggedIn 
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }
    onToggleFavorite(_id, !isFavorite);
  };

  return (
    <div className={styles.recipeCard}>
      <img src={thumb || "/image/postcard-8755004_640.webp"} alt={title} className={styles.imageCard} />
<div className={styles.recipeForm}>
      <h3 className={styles.recipeTitle}>{title}</h3>
{time && (
          <div className={styles.recipeTitleTime}>
            <span>⏱️</span> {/* иконка таймера */}
            <span>{time} min</span>
          </div>
        )}
</div>
<div className={styles.recipeDescCal}>
      <p className={styles.recipeDescription}>{description}</p>

      <p className={styles.recipeDescription}> - {calories} cals</p>

</div>
<div className={styles.formButton}>
      <button className={styles.learnMoreButton}
      onClick={() => navigate(`/recipes/${_id}`)}
    >
        Learn More
      </button>

      <button
        className={isFavorite ? styles.favoriteActive : styles.favorite}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove' : 'Add'}
      >
        {isFavorite ? 'Remove' : 'Add'}
      </button>
      </div>
    </div>
  );
};

export default RecipeCard;
