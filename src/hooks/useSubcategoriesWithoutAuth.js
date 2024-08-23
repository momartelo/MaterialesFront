import { useState, useEffect } from "react";
import { fetchSubcategoriesWithoutAuth } from "../functions/getSubcategory";

const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

export const useSubcategoriesWithoutAuth = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubcategories = async () => {
      try {
        setLoading(true);
        const data = await fetchSubcategoriesWithoutAuth();
        setSubcategories(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching subcategories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSubcategories();

    // Ensure that the loading indicator is shown for at least MIN_LOADING_TIME
    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return { subcategories, loading, minLoadingTimeElapsed, error };
};
