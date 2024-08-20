import styles from "./UnitItem.module.css";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useState } from "react";
import { Link } from "react-router-dom";
import UpdateUnitModal from "../UpdateUnitModal/UpdateUnitModal";
import DeleteUnitModal from "../DeleteUnitModal/DeleteUnitModal";

const UnitItem = ({ unit, getUnit }) => {
  const modalId = useId();
  const { auth } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowUpdateModal(false);
  };

  console.log(unit);

  return (
    <div className={styles.item}>
      <section className={styles.sectionUnitItem}>
        <h2>{unit.unit}</h2>
      </section>
      {auth ? (
        <div className={styles.containerIcons}>
          <Link
            className={styles.containerIconEdit}
            onClick={handleUpdateClick}
          >
            <div className={styles.iconEdit}>
              <HiOutlinePencilAlt />
            </div>
          </Link>
          <Link
            className={styles.containerIconErase}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(e);
            }}
          >
            <div className={styles.iconErase}>
              <HiOutlineTrash />
            </div>
          </Link>
          <UpdateUnitModal
            show={showUpdateModal}
            onHide={handleCloseModal}
            getUnit={async () => {
              await getUnit();
            }}
            modalId={modalId}
            unitId={unit._id}
            unit={unit.unit}
          />
          <DeleteUnitModal
            show={showDeleteModal}
            onHide={handleCloseModal}
            getUnit={async () => {
              await getUnit();
            }}
            modalId={modalId}
            unitId={unit._id}
            unit={unit.unit}
          />
        </div>
      ) : (
        <div className={styles.containerIcons}></div>
      )}
    </div>
  );
};

export default UnitItem;
