import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate, Link } from 'react-router-dom'
import style from "../styles/Register.module.css"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date(),
      })

      alert("Пользователь успешно зарегистрирован!")
      navigate("/")
    } catch (error) {
      console.error(error)

      if (error.code === "auth/email-already-in-use") {
        navigate("/login")
      } else {
        alert("Ошибка при регистрации")
      }
    }
  }

  return (
    <div className={style.wrapper}>
      <form className={style.container} onSubmit={handleRegister}>
        <h2 className={style.title}>Регистрация</h2>

        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={form.name}
          onChange={handleChange}
        />

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


        <button type="submit" className={style.registerBtn}>
          Зарегистрироваться
        </button>

        <p className={style.text}>
          Уже есть аккаунт?{" "}
          <Link to="/login" className={style.loginLink}>
            Войти
          </Link>
        </p>

      </form>
    </div>
  )
}

export default Register