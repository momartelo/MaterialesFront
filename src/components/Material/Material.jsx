import { useState, useEffect, useContext } from "react";
import MaterialItem from "../MaterialItem/MaterialItem";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./Material.module.css";
import MaterialItem2 from "../MaterialItem2/MaterialItem2";
import { AuthContext } from "../../providers/AuthProvider";

const Material = ({ materials, getMaterial }) => {
  const [search, setSearch] = useState("");
  const [filterMaterials, setFilterMaterials] = useState(materials);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = materials.filter((mat) => {
      return mat.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilterMaterials(filtered);
  }, [search, materials]);

  return (
    <div className={styles.containerMaterial}>
      {auth ? (
        <div className={styles.subcontainerMaterial}>
          <Link to="/material/new" className={styles.btnSuccess}>
            Material Nuevo
          </Link>

          <div className={styles.searchContainer}>
            <input
              type="search"
              className={styles.formControl}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
        </div>
      ) : (
        <div className={styles.subcontainerMaterial}></div>
      )}
      <div className={styles.containerItem}>
        {filterMaterials.map((material) => (
          <MaterialItem2
            getMaterial={getMaterial}
            key={material._id}
            material={material}
            onClick={() => navigate(`/material/${material._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Material;
