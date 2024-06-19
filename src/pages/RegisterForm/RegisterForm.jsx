import styles from "./RegisterForm.module.css";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts.js";

function RegisterForm() {
  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { avatar, email, username, password } = e.target.elements;

    const formData = new FormData(e.target);

    const avatar = formData.get("avatar");
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const isAdmin = formData.get("isAdmin")

    const user = {
      avatar,
      email,
      username,
      password,
      isAdmin
    };

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} ref={ref} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="avatar"></label>
          <input type="url" placeholder="URL" name="avatar" id="avatar" required/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email"></label>
          <input type="email" placeholder="email" name="email" id="email" required/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" name="username" id="username" required/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*******" name="password" id="password" required/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="isAdmin">Es Administrador?</label>
          <input type="checkbox" name="isAdmin" id="isAdmin"/>
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
