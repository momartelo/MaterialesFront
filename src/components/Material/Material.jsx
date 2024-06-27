import { useState, useEffect } from "react";
import MaterialItem from "../MaterialItem/MaterialItem";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./Material.module.css";

const Material = ({ materials, getMaterial }) => {
  const [search, setSearch] = useState("");
  const [filterMaterials, setFilterMaterials] = useState(materials);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = materials.filter((mat) => {
      return mat.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilterMaterials(filtered);
  }, [search, materials]);

  return (
    <div className={styles.containerMaterial}>
      <div className={styles.subcontainerMaterial}>
        <Link to="/material/new" className={styles.btnSuccess}>
          Nuevo Material
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
      <>
        {filterMaterials.map((material) => {
          return (
            <MaterialItem
              getMaterial={getMaterial}
              key={material._id}
              material={material}
              onClick={() => {
                navigate(`/material/${material._id}`);
              }}
            />
          );
        })}
      </>
    </div>
  );
};

export default Material;
