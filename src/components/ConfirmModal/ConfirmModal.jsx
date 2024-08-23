import styles from "./ConfirmModal.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const ConfirmModal = ({ show, onHide, modalMessage, onConfirm }) => {
  const { auth } = useContext(AuthContext);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mensaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
