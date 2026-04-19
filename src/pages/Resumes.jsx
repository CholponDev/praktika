import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import styles from "../styles/Resumes.module.css";

function Resumes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [resume, setResume] = useState({
    fullName: "",
    profession: "",
    city: "",
    phone: "",
    email: "",
    about: "",
    skills: "",
    experience: "",
    education: "",
    portfolio: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const resumeRef = doc(db, "resumes", currentUser.uid);
        const resumeSnap = await getDoc(resumeRef);

        if (resumeSnap.exists()) {
          setResume((prev) => ({
            ...prev,
            ...resumeSnap.data(),
          }));
        } else {
          setResume((prev) => ({
            ...prev,
            email: currentUser.email || "",
          }));
        }
      } catch (error) {
        console.log("Ошибка при загрузке резюме:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Сначала войдите в аккаунт");
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, "resumes", user.uid),
        {
          ...resume,
          userId: user.uid,
          email: resume.email || user.email,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Резюме сохранено");
    } catch (error) {
      console.log("Ошибка при сохранении резюме:", error);
      alert("Ошибка при сохранении");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 className={styles.loading}>Загрузка резюме...</h2>;
  }

  if (!user) {
    return <h2 className={styles.loading}>Сначала войдите в аккаунт</h2>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span>Мои резюме</span>
        <h1>Создай резюме для отклика на вакансии</h1>
        <p>
          Заполни данные один раз, и потом это резюме можно использовать для
          отклика на вакансии.
        </p>
      </div>

      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSave}>
          <h2>Данные резюме</h2>

          <input
            name="fullName"
            placeholder="Имя и фамилия"
            value={resume.fullName}
            onChange={handleChange}
          />

          <input
            name="profession"
            placeholder="Желаемая должность"
            value={resume.profession}
            onChange={handleChange}
          />

          <div className={styles.row}>
            <input
              name="city"
              placeholder="Город"
              value={resume.city}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Телефон"
              value={resume.phone}
              onChange={handleChange}
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            value={resume.email}
            onChange={handleChange}
          />

          <textarea
            name="about"
            placeholder="Коротко о себе"
            value={resume.about}
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder="Навыки: React, JavaScript, HTML, CSS..."
            value={resume.skills}
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder="Опыт работы или учебные проекты"
            value={resume.experience}
            onChange={handleChange}
          />

          <textarea
            name="education"
            placeholder="Образование / курсы"
            value={resume.education}
            onChange={handleChange}
          />

          <input
            name="portfolio"
            placeholder="Ссылка на портфолио или GitHub"
            value={resume.portfolio}
            onChange={handleChange}
          />

          <button type="submit" disabled={saving}>
            {saving ? "Сохраняется..." : "Сохранить резюме"}
          </button>
        </form>

        <div className={styles.preview}>
          <div className={styles.previewTop}>
            <div className={styles.avatar}>
              {resume.fullName ? resume.fullName[0].toUpperCase() : "R"}
            </div>

            <div>
              <h2>{resume.fullName || "Имя Фамилия"}</h2>
              <p>{resume.profession || "Желаемая должность"}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <span>{resume.city || "Город"}</span>
            <span>{resume.phone || "Телефон"}</span>
            <span>{resume.email || "Email"}</span>
          </div>

          <div className={styles.block}>
            <h3>О себе</h3>
            <p>
              {resume.about ||
                "Здесь будет короткое описание кандидата, его цели и сильные стороны."}
            </p>
          </div>

          <div className={styles.block}>
            <h3>Навыки</h3>
            <p>{resume.skills || "React, JavaScript, HTML, CSS"}</p>
          </div>

          <div className={styles.block}>
            <h3>Опыт</h3>
            <p>
              {resume.experience ||
                "Здесь можно написать опыт работы или учебные проекты."}
            </p>
          </div>

          <div className={styles.block}>
            <h3>Образование</h3>
            <p>{resume.education || "Курсы, колледж, университет..."}</p>
          </div>

          {resume.portfolio && (
            <div className={styles.block}>
              <h3>Портфолио</h3>
              <a href={resume.portfolio} target="_blank" rel="noreferrer">
                {resume.portfolio}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resumes;