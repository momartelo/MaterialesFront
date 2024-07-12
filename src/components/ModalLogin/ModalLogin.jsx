// src/components/ModalLogin/ModalLogin.jsx
import React, { useContext, useId, useRef } from "react";
import Modal from "react-modal";
import styles from "./ModalLogin.module.css";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts";

Modal.setAppElement("#root");

const ModalLogin = ({ isOpen, onRequestClose }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const password = formData.get("password");

    const user = {
      email,
      password,
    };

    try {
      const req = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!req.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const res = await req.json();
      login(res);
      formRef.current.reset();
      onRequestClose();
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      // Puedes manejar el error aquí, por ejemplo mostrando un mensaje al usuario
      alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalHeader}>
        <button className={styles.closeButton} onClick={onRequestClose}>
          ×
        </button>
      </div>
      <div className={styles.modalBody}>
        <h2>Login</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles.formEmail}>
            <label>Email: </label>
            <input type="email" name="email" required />
          </div>
          <div className={styles.formPassword}>
            <label>Contraseña: </label>
            <input type="password" name="password" required />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
      <div className={styles.modalFooter}>
        <p>Si no tiene una cuenta -&nbsp;</p>
        <Link to="/register">Registrese</Link>
      </div>
    </Modal>
  );
};

export default ModalLogin;

// function LoginForm() {
//   const ref = useRef(null);

//   const emailRef = useId();
//   const passwordRef = useId();

//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const email = formData.get("email");
//     const password = formData.get("password");

//     const user = {
//       email,
//       password,
//     };

//     const req = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });

//     if (req.status !== 200) {
//       ref.current.reset();
//       return alert("Error al iniciar sesión");
//     }

//     const res = await req.json();

//     login(res);

//     ref.current.reset();

//     navigate("/");
//   };
// }

// const ModalLogin = ({ isOpen, onRequestClose }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className={styles.modalContent}
//       overlayClassName={styles.modalOverlay}
//     >
//       <div className={styles.modalHeader}>
//         <button className={styles.closeButton} onClick={onRequestClose}>
//           ×
//         </button>
//       </div>
//       <div className={styles.modalBody}>
//         <h2>Login</h2>
//         <form>
//           <label>
//             Usuario:
//             <input type="text" name="username" />
//           </label>
//           <br />
//           <label>
//             Contraseña:
//             <input type="password" name="password" />
//           </label>
//           <br />
//           <button type="submit" onClick={LoginForm()}>Ingresar</button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default ModalLogin;
