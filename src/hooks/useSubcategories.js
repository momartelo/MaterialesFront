// hooks/useCategories.js
import { useState, useEffect } from "react";
import { fetchSubcategories } from "../functions/getSubcategory";

export const useSubcategories = (token) => {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  useEffect(() => {
    if (token) {
      const loadSubcategories = async () => {
        try {
          setLoading(true);
          const data = await fetchSubcategories(token);
          setSubcategories(data);
        } catch (err) {
          setError(err);
          console.error("Error fetching subcategories:", err);
        } finally {
          setLoading(false);
        }
      };

      loadSubcategories();
      const timer = setTimeout(() => {
        setMinLoadingTimeElapsed(true);
      }, MIN_LOADING_TIME);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return { subcategories, loading, error };
};
