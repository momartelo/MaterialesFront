import { useState, useEffect } from "react";
import { fetchUnits } from "../functions/getUnit";

export const useUnits = (token) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  useEffect(() => {
    if (token) {
      const loadUnits = async () => {
        try {
          setLoading(true);
          const data = await fetchUnits(token);
          setUnits(data);
        } catch (err) {
          setError(err);
          console.error("Error fetching units:", err);
        } finally {
          setLoading(false);
        }
      };

      loadUnits();
      const timer = setTimeout(() => {
        setMinLoadingTimeElapsed(true);
      }, MIN_LOADING_TIME);

      return () => clearTimeout(timer);
    }
  }, [token]);

  return { units, loading, error };
};
