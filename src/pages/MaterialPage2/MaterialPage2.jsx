import styles from "../MaterialPage2/MaterialPage2.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { fetchMaterials2 } from "../../functions/getMaterial.js";

function MaterialPage2() {
  const [materials, setMaterials] = useState([]);
  // const { auth } = useContext(AuthContext);
  const getMaterial = useCallback(() => {
    fetchMaterials2()
      .then((data) => setMaterials(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMaterial();
  }, [getMaterial]);


  return (
    <div className={styles.containerMaterialPage}>
      <Navbar />
      <h2>Materiales</h2>
      <main className={styles.mainMaterialPage}>
        <Material getMaterial={getMaterial} materials={materials} />
      </main>
    </div>
  );
}

export default MaterialPage2;
