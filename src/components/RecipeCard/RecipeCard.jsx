
import styles from './RecipeCard.module.css'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RecipeCard = ({ recipe, onToggleFavorite }) => {
  const { id, image, title, description, calories, isFavorite } = recipe;
  const isLoggedIn = useSelector(() => true); // потом добавь вместо функции true, selectIsLoggedIn 
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate('/auth/login');
      return;
    }
    onToggleFavorite(id, !isFavorite);
  };

  return (
    <div className={styles.recipeCard}>
      <img src={image || "/image/postcard-8755004_640.webp"} alt={title} />

      <h3 className={styles.recipeTitle}>{title}</h3>

      <p className={styles.recipeDescription}>{description}</p>

      <p className={styles.recipeCalories}> - {calories} cals</p>

      <button className={styles.learnMoreButton}
      onClick={() => navigate(`/recipes/${id}`)}
    >
        Learn More
      </button>

      <button
        className={isFavorite ? styles.favoriteActive : styles.favorite}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default RecipeCard;
