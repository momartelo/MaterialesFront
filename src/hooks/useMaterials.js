import { useState, useEffect } from "react";
import { fetchMaterials } from "../functions/getMaterial";

export const useMaterials = (token) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  useEffect(() => {
    if (token) {
      const loadMaterials = async () => {
        try {
          setLoading(true);
          const data = await fetchMaterials(token);
          setMaterials(data);
        } catch (err) {
          setError(err);
          console.error("Error fetching materials:", err);
        } finally {
          setLoading(false);
        }
      };

      loadMaterials();
      const timer = setTimeout(() => {
        setMinLoadingTimeElapsed(true);
      }, MIN_LOADING_TIME);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return { materials, loading, error };
};
