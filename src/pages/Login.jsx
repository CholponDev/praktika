import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Register.module.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      alert("Вход выполнен успешно");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        alert("Неверный email или пароль");
      } else {
        alert("Ошибка входа");
      }
    }
  };

  return (
    <form className={style.container} onSubmit={handleLogin}>
      <h2>Вход</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Войти</button>

      <p>
        Нет аккаунта? <Link to="/register">Регистрация</Link>
      </p>
    </form>
  );
}

export default Login;