import styles from "./DeleteSubcategoryModal.module.css";
import { API_URL } from "../../utils/config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";

const DeleteSubcategoryModal = ({
  show,
  subcategoryId,
  onHide,
  subcategory,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  const getContainerClass = () => {
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const materialClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const handleClose = () => {
    onHide();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/subcategory/${subcategoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        alert("Error al eliminar la subcategoria");
        return;
      }
      handleClose();
      // await getSubcategory();
      navigate(0);
    } catch (error) {
      console.error("Error al eliminar la subcategoria", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/advertencia.png" alt="" />
          <p> Eliminar Subcategoria</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <p>
          ¿Está seguro de que desea eliminar la categoria{" "}
          <strong>"{subcategory}"</strong>?
        </p>
        <p>¡Esta acción no se puede deshacer!!!</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`${styles.buttonDelete} ${materialClass} ${modeClass}`}
          onClick={handleDelete}
        >
          Eliminar
        </button>
        <button
          className={`${styles.buttonBack} ${materialClass} ${modeClass}`}
          onClick={handleClose}
        >
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSubcategoryModal;
