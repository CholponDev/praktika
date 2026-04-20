import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import styles from "../styles/Resumes.module.css";
import translations from "../translations";

function Resumes({ lang }) {
  const t = translations.resumesList?.[lang] || {};
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      try {
        setLoading(true);

        const querySnapshot = await getDocs(collection(db, "resumes"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResumes(data);
      } catch (error) {
        console.log("Ошибка загрузки резюме:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getAvatar = (name) => {
    return name ? name.trim()[0].toUpperCase() : "U";
  };

  if (loading) {
    return <div className={styles.loading}>{t.loading || "Loading..."}</div>;
  }

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>{t.title || "Резюме кандидатов"}</h1>
        <p>{t.subtitle || "Найдите подходящих специалистов"}</p>

        <button
          className={styles.postBtn}
          onClick={() => navigate("/post-resume")}
        >
          {t.post || "Откликнуться"}
        </button>
      </div>

      {/* EMPTY STATE */}
      {resumes.length === 0 ? (
        <div className={styles.empty}>
          {t.empty || "Нет резюме"}
        </div>
      ) : (
        <div className={styles.grid}>
          {resumes.map((item) => (
            <div key={item.id} className={styles.card}>
              
              {/* TOP */}
              <div className={styles.cardTop}>
                <div className={styles.avatar}>
                  {getAvatar(item.fullName)}
                </div>

                <div>
                  <h2>{item.fullName}</h2>
                  <p className={styles.profession}>{item.profession}</p>
                </div>
              </div>

              {/* INFO */}
              <div className={styles.info}>
                <span>{item.city}</span>
                <span>{item.email}</span>
              </div>

              {/* ABOUT */}
              <p className={styles.about}>
                {item.about?.slice(0, 120)}
                {item.about?.length > 120 ? "..." : ""}
              </p>

              {/* SKILLS */}
              <div className={styles.skills}>
                {item.skills?.split(",").map((skill, i) => (
                  <span key={i}>{skill.trim()}</span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className={styles.actions}>
                <button
                  onClick={() => navigate(`/resume/${item.id}`)}
                  className={styles.detailBtn}
                >
                  {t.details || "Подробнее"}
                </button>

                <button
                  onClick={() => navigate("/post-resume")}
                  className={styles.applyBtn}
                >
                  {t.apply || "Откликнуться"}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resumes;