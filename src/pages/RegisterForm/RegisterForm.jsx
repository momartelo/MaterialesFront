import styles from "./RegisterForm.module.css";
import { useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/config";

function RegisterForm() {
  const ref = useRef(null);
  const genderId = useId();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const avatar = formData.get("avatar");
    const email = formData.get("email");
    const username = formData.get("username");
    const genero = formData.get("genero");
    const password = formData.get("password");

    const isAdmin = formData.get("isAdmin") === "on";

    const user = {
      avatar,
      email,
      username,
      genero,
      password,
      isAdmin,
    };
    console.log(user);

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) return alert("Error al registrar usuario");
    ref.current.reset();

    navigate("/login");
  };

  return (
    <div className={styles.containerRegister}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} ref={ref} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="avatar">Avatar:</label>
          <input type="url" placeholder="URL" name="avatar" id="avatar" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="" name="email" id="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="genero">Genero:</label>
          <select name="genero" id={genderId}>
            <option value="">Seleccionar Genero</option>
            <option value="MASC">Masculino</option>
            <option value="FEM">Femenino</option>
            <option value="NO-BIN">No Binario</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder=""
            name="username"
            id="username"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder=""
            name="password"
            id="password"
            required
          />
        </div>
        <div className={styles.inputGroup} id="checkbox">
          <label htmlFor="isAdmin">Es Administrador?</label>
          <input type="checkbox" name="isAdmin" id="isAdmin" />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
