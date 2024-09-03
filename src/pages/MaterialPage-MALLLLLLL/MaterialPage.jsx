import styles from "../MaterialPage/MaterialPage.module.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { useMaterials } from "../../hooks/useMaterials";
import { useMaterialsWithoutAuth } from "../../hooks/useMaterialsWithoutAuth";

function MaterialPage() {
  // const [materials, setMaterials] = useState([]);
  const { auth } = useContext(AuthContext);

  const { materials, errorMat } = useMaterials(auth.token);

  if (errorMat) {
    return <div>Error al cargar datos</div>;
  }

  // const getMaterial = useCallback(() => {
  //   fetchMaterials(auth.token)
  //     .then((data) => setMaterials(data))
  //     .catch((err) => console.log(err));
  // }, [auth.token]);

  // useEffect(() => {
  //   getMaterial();
  // }, [auth, getMaterial]);

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Materiales</h2>
      <main className={styles.section}>
        <Material getMaterial={useMaterialsWithoutAuth} materials={materials} />
      </main>
    </div>
  );
}

export default MaterialPage;
