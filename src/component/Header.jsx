import React, { useEffect, useRef, useState } from "react";
import style from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import photo from "../assets/emgek.jpeg";
import translations from "../translations";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function Header({ city, setCity, lang, setLang }) {
  const navigate = useNavigate();

  const [openPhoto, setOpenPhoto] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserName(null);
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserName(snap.data().name);
        } else {
          setUserName("Пользователь");
        }
      } catch (err) {
        console.log(err);
        setUserName("Пользователь");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserName(null);
    navigate("/login");
  };

  const handleAddResume = () => {
    if (userName) {
      navigate("/post-resume");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={style.header}>
      <div className={style.left}>
        <h1 className={style.logo}>EMGEK</h1>

        <img
          className={style.photo}
          src={photo}
          alt="photo"
          onClick={() => setOpenPhoto(true)}
        />

        <div
          className={`${style.overlay} ${openPhoto ? style.showOverlay : ""}`}
          onClick={() => setOpenPhoto(false)}
        >
          <img
            className={`${style.bigPhoto} ${openPhoto ? style.showPhoto : ""}`}
            src={photo}
            alt="photo"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <ul className={style.navList}>
          <li className={style.navItem} onClick={() => navigate("/jobs")}>
            {lang === "ru" ? "Вакансии" : "Вакансиялар"}
          </li>

          <li
            className={style.navItem}
            onClick={() => navigate("/recruit-info")}
          >
            {lang === "ru" ? "Ищу сотрудника" : "Кызматкер издейм"}
          </li>

          <li className={style.navItem} onClick={() => navigate("/resumes")}>
            {lang === "ru" ? "Резюме" : "Резюмелер"}
          </li>
        </ul>
      </div>

      <div className={style.right}>
        {/* USER MENU */}
        <div className={style.userBox} ref={menuRef}>
          {userName ? (
            <button
              className={style.userBtn}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {userName}
            </button>
          ) : (
            <button
              className={style.button}
              onClick={() => navigate("/register")}
            >
              {lang === "ru" ? "Регистрация" : "Катталуу"}
            </button>
          )}

          {menuOpen && userName && (
            <div className={style.dropdown}>
              <div className={style.item} onClick={() => navigate("/resumes")}>
                Мои резюме
              </div>

              <div className={style.item} onClick={() => navigate("/applications")}>
                Мои отклики
              </div>

              <div className={style.item} onClick={() => navigate("/favorites")}>
                Избранные вакансии
              </div>

              <div className={style.item} onClick={() => navigate("/stats")}>
                Статистика
              </div>

              <div className={style.item} onClick={() => navigate("/profile")}>
                Мой профиль
              </div>

              <div className={style.item} onClick={() => navigate("/instructions")}>
                Инструкции
              </div>

              <div className={style.divider} />

              <div className={style.logout} onClick={handleLogout}>
                Выход
              </div>
            </div>
          )}
        </div>

        {/* ➕ BUTTON */}
        <button className={style.button} onClick={handleAddResume}>
          {lang === "ru" ? "Добавить резюме" : "Резюме кошуу"}
        </button>

        {/* 🌍 FLAGS (ПОСЛЕ КНОПКИ) */}
        <div style={{ display: "flex", gap: "8px", marginLeft: "10px" }}>
          <img
            src="https://flagcdn.com/w40/ru.png"
            alt="ru"
            onClick={() => setLang("ru")}
            style={{
              cursor: "pointer",
              width: "24px",
              opacity: lang === "ru" ? 1 : 0.5,
              transform: lang === "ru" ? "scale(1.1)" : "scale(1)",
              transition: "0.2s",
              borderRadius: "3px",
            }}
          />

          <img
            src="https://flagcdn.com/w40/kg.png"
            alt="kg"
            onClick={() => setLang("kg")}
            style={{
              cursor: "pointer",
              width: "24px",
              opacity: lang === "kg" ? 1 : 0.5,
              transform: lang === "kg" ? "scale(1.1)" : "scale(1)",
              transition: "0.2s",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;