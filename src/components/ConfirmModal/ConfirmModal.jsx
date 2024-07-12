import styles from "./ConfirmModal.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const ConfirmModal = ({ show, onHide, modalMessage, onConfirm }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleClose = () => {
    onConfirm();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mensaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
