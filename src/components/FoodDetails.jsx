import { useEffect, useState } from 'react';
import styles from './fooddeatils.module.css';
import ItemList from './itemList';

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = 'b551b472a9b04eca91e38405b2427ff6';
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⌚️ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            👫 <strong> Serves {food.servings}</strong>
          </span>
          <span>
            <strong>
              {food.vergetairan ? '🥕 Vegetaian' : '🍖 Non-Vegetaian'}{' '}
            </strong>{' '}
          </span>
          <span>
            <strong>{food.vegan ? '🐮 Vegan' : ''}</strong>
          </span>
        </div>
        <div>
          $ 2
          <span>
            <strong>{food.pricePerServing / 100} Per serving</strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />
        <h2>Instructions</h2>
        <div className={styles.recipeInstructions}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
