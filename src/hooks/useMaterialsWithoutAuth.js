import { useState, useEffect } from "react";
import { fetchMaterialsWithoutAuth } from "../functions/getMaterial";

const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

export const useMaterialsWithoutAuth = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMaterials = async () => {
      try {
        setLoading(true);
        const data = await fetchMaterialsWithoutAuth();
        setMaterials(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching materials:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();

    // Ensure that the loading indicator is shown for at least MIN_LOADING_TIME
    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return { materials, loading, minLoadingTimeElapsed, error };
};
