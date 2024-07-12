import styles from "../MaterialPage/MaterialPage.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { fetchMaterials } from "../../functions/getMaterial.js";

function MaterialPage() {
  const [materials, setMaterials] = useState([]);
  const { auth } = useContext(AuthContext);
  console.log(auth);
  const getMaterial = useCallback(() => {
    fetchMaterials(auth.token)
      .then((data) => setMaterials(data))
      .catch((err) => console.log(err));
  }, [auth.token]);

  useEffect(() => {
    getMaterial();
  }, [auth, getMaterial]);


  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Materiales</h2>
      <main className={styles.section}>
        <Material getMaterial={getMaterial} materials={materials} />
      </main>
    </div>
  );
}

export default MaterialPage;
