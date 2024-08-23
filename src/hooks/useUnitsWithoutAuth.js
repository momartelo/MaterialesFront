import { useState, useEffect } from "react";
import { fetchUnitsWithoutAuth } from "../functions/getUnit";

const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

export const useUnitsWithoutAuth = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        setLoading(true);
        const data = await fetchUnitsWithoutAuth();
        setUnits(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching units:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUnits();

    // Ensure that the loading indicator is shown for at least MIN_LOADING_TIME
    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return { units, loading, minLoadingTimeElapsed, error };
};
