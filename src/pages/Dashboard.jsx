import { useEffect, useRef, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserName(userSnap.data().name || "пользователь");
        } else {
          setUserName("пользователь");
        }
      } catch (err) {
        console.error(err);
        setUserName("пользователь");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.logo}>Dashboard</span>

        <div className={styles.userBox} ref={menuRef}>
          <button
            className={styles.userButton}
            onClick={() => setOpen((prev) => !prev)}
          >
            Добро пожаловать,{" "}
            <span className={styles.userName}>{userName}</span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className={styles.dropdown}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <DropdownItem>Мои резюме</DropdownItem>
                <DropdownItem>Мои отклики</DropdownItem>
                <DropdownItem>Избранные вакансии</DropdownItem>
                <DropdownItem>Статистика</DropdownItem>
                <DropdownItem>Мой профиль</DropdownItem>
                <DropdownItem>Инструкции</DropdownItem>

                <div className={styles.divider} />

                <button
                  className={styles.logout}
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.content}>
        <h2>Ваш личный кабинет</h2>
        <p>Добро пожаловать в систему управления вакансий.</p>
      </div>
    </div>
  );
}

function DropdownItem({ children }) {
  return <div className={styles.item}>{children}</div>;
}

export default Dashboard;