import { useState, useEffect } from "react";
import { fetchCategories } from "../functions/getCategory";

export const useCategories = (token) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  useEffect(() => {
    if (token) {
      const loadCategories = async () => {
        try {
          setLoading(true);
          const data = await fetchCategories(token);
          setCategories(data);
        } catch (err) {
          setError(err);
          console.error("Error fetching categories:", err);
        } finally {
          setLoading(false);
        }
      };

      loadCategories();
      const timer = setTimeout(() => {
        setMinLoadingTimeElapsed(true);
      }, MIN_LOADING_TIME);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return { categories, loading, error };
};
