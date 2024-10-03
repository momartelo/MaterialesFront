import { useEffect } from "react";
import { getInflationData } from "../../functions/fetchs";
import useAppContext from "../../hooks/useAppContext";
import styles from "./InflacionMPage.module.css";

const InflacionMPage = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [inflacion, setInflacion] = useState(null); // Para almacenar los datos
  const [errorI, setErrorI] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchInflacionData = async () => {
      try {
        const data = await getInflationData(); // Llama a la función
        setInflacion(data.data); // Establece el estado con los datos (response.data)
      } catch (error) {
        setErrorI(error.message); // Establece el mensaje de error
      }
    };

    fetchInflacionData(); // Llama a la función de obtención de datos
  }, []); // Dependencias vacías para que solo se ejecute al montar

  console.log(inflacion); // Para verificar los datos en la consola

  return <div>InflacionMPage</div>;
};

export default InflacionMPage;
