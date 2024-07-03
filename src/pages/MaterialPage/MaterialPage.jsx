import styles from "../MaterialPage/MaterialPage.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar3 from "../../components/Navbar3/Navbar3";

function MaterialPage() {
  const [materials, setMaterials] = useState([]);
  const { auth } = useContext(AuthContext);
  console.log(auth);
  const getMaterial = useCallback(() => {
    fetch(`${API_URL}/material`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.log(err));
  }, [auth.token]);

  useEffect(() => {
    getMaterial();
  }, [auth, getMaterial]);
  //}, [auth, getMaterial]);

  return (
    <div className={styles.container}>
      <Navbar3 />
      <h2>Mis Materiales</h2>
      <main className={styles.section}>
        <Material getMaterial={getMaterial} materials={materials} />
      </main>
    </div>
  );
}

export default MaterialPage;
