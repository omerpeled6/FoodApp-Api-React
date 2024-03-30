import { useEffect, useState } from 'react';
import styles from './search.module.css';

const URL = 'https://api.spoonacular.com/recipes/complexSearch';
const API_KEY = 'b551b472a9b04eca91e38405b2427ff6';
export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState('pizza');
  // Syntax of the useEffect hook => useEffect(() => {},[]);
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data.results);
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]); // // print every change in the query);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
      />
    </div>
  );
}
