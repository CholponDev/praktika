import React from "react";
import style from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import photo from "../assets/emgek.jpeg";
import { useState } from "react";

function Header({ city, setCity }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className={style.header}>
      <div className={style.left}>
        <h1 className={style.logo}>EMGEK</h1>
        <img className={style.photo} src={photo} alt="photo" onClick={() => setOpen(true)} />

          <div className={`${style.overlay} ${open ? style.showOverlay : ""}`}
                onClick={() => setOpen(false)}>
            <img className={`${style.bigPhoto} ${open ? style.showPhoto : ""}`}
                 src={photo}
               alt="photo"
               onClick={(e) => e.stopPropagation()}  />
          </div>

        <ul className={style.navList}>
          <li className={style.navItem} onClick={() => navigate("/jobs")}>Ищу работу</li>
          <li className={style.navItem}>Ищу сотрудника</li>
        </ul>
      </div>

      <div className={style.right}>
        <div className={style.locationBox}>
          <label htmlFor="city" className={style.label}>
            Город
          </label>

          <select
            id="city"
            className={style.select}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="all">Все города</option>
            <option value="Бишкек">Бишкек</option>
            <option value="Ош">Ош</option>
            <option value="Джалал-Абад">Джалал-Абад</option>
            <option value="Каракол">Каракол</option>
            <option value="Нарын">Нарын</option>
          </select>
        </div>

        <button
          className={style.button}
          onClick={() => navigate("/register")}
        >
          Регистрация
        </button>

        <img
          className={style.img}
          src="https://cdn-icons-png.freepik.com/512/8608/8608769.png"
          alt="profile"
        />
      </div>
    </header>
  );
}

export default Header;