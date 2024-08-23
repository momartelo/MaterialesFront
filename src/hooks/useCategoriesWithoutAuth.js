import { useState, useEffect } from "react";
import { fetchCategoriesWithoutAuth } from "../functions/getCategory"; // Importa la función

const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

export const useCategoriesWithoutAuth = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategoriesWithoutAuth();
        setCategories(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();

    // Ensure that the loading indicator is shown for at least MIN_LOADING_TIME
    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return { categories, loading, minLoadingTimeElapsed, error };
};
