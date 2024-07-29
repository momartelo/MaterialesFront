import styles from "../MaterialPage2/MaterialPage2.module.css";
import { useCallback, useEffect, useState } from "react";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { fetchMaterialsWithoutAuth } from "../../functions/getMaterial.js";
import { fetchCategoriesWithoutAuth } from "../../functions/getCategory";

function MaterialPage2() {
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMaterial = useCallback(() => {
    setLoading(true);
    fetchMaterialsWithoutAuth()
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const getCategory = useCallback(() => {
    fetchCategoriesWithoutAuth()
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMaterial();
    getCategory();
  }, [getMaterial, getCategory]);

  return (
    <div className={styles.containerMaterialPage}>
      <Navbar />
      <h2>Materiales</h2>
      <main className={styles.mainMaterialPage}>
        <Material
          getMaterial={getMaterial}
          materials={materials}
          categories={categories}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default MaterialPage2;

// import styles from "../MaterialPage2/MaterialPage2.module.css";
// import { useCallback, useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import Material from "../../components/Material/Material";
// import Navbar from "../../components/Navbar/Navbar";
// import { fetchMaterialsWithoutAuth } from "../../functions/getMaterial.js";
// import { fetchCategoriesWithoutAuth } from "../../functions/getCategory";

// function MaterialPage2() {
//   const [materials, setMaterials] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const { auth } = useContext(AuthContext);
//   const getMaterial = useCallback(() => {
//     fetchMaterialsWithoutAuth()
//       .then((data) => setMaterials(data))
//       .catch((err) => console.log(err));
//   }, []);

//   const getCategory = useCallback(() =>{
//     fetchCategoriesWithoutAuth()
//       .then((data) => setCategories(data))
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     getMaterial();
//   }, [getMaterial]);

//   useEffect(() => {
//     getCategory();
//   }, [getCategory]);

//   return (
//     <div className={styles.containerMaterialPage}>
//       <Navbar />
//       <h2>Materiales</h2>
//       <main className={styles.mainMaterialPage}>
//         <Material getMaterial={getMaterial} materials={materials} categories={categories}/>
//       </main>
//     </div>
//   );
// }

// export default MaterialPage2;
