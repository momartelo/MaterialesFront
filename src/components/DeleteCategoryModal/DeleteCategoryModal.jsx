import styles from "./DeleteCategoryModal.module.css"
import { API_URL } from "../../utils/consts"
import  Button  from "react-bootstrap/Button"
import  Modal  from "react-bootstrap/Modal"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../providers/AuthProvider"
import { useContext } from "react"

const DeleteCategoryModal = ({ 
    show,
    categoryId,
    getCategory,
    onHide,
    category,
}) => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)
    const handleClose = () => {
        onHide();
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`${API_URL}/category/${categoryId}`, {
                method: "DELETE",
                headers: { Authorization: auth.token}
            });
            if (res.status !== 200) { alert("Error al eliminar la categoria");
            return;
            }
            handleClose();
            await getCategory();
            navigate("/category");
        } catch (error) {
            console.error("Error al eliminar el material:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Categoria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Está seguro de que desea eliminar la categoria "{category}"? Esta acción
                    no se puede deshacer.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteCategoryModal;