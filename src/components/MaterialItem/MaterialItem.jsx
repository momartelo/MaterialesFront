import styles from "./MaterialItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useCallback, useEffect, useId, useState } from "react";
import DeleteMaterialModel from "../DeleteMaterialModel/DeleteModel";
import { API_URL } from "../../utils/consts";

const MaterialItem = ({ material, getMaterial, onClick }) => {
  const modalId = useId();

  const [categories, setCategories] = useState([]);

  const getCategories = useCallback(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  console.log("categorias desde MaterialItem");
  console.log(categories);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.category : "Categoría no encontrada";
  };

  return (
    <div
      key={material._id}
      className={styles.item}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <section className={styles.sectionMaterialItem}>
        <h2>{material.name}</h2>
        <p>
          <b>{getCategoryName(material.category)}</b>
          <span>{material.precio}</span>
          <span>{material.moneda}</span>
        </p>
      </section>
      <div>
        <Link
          style={{ fontSize: "30px", color: "green" }}
          className="font-warning"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal" + material._id}
          style={{ fontSize: "30px", color: "red" }}
        >
          <HiOutlineTrash />
        </Link>

        <DeleteMaterialModel
          getPlaylist={getMaterial}
          modalId={modalId}
          playlistId={material._id}
        />
      </div>
    </div>
  );
};

export default MaterialItem;
