import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import styles from "../styles/Addresume.module.css";
import translations from "../translations";
import { useNavigate } from "react-router-dom";

function Addresume({ lang }) {

  const navigate = useNavigate();


 const t = translations?.resumes?.[lang] || {};

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
      alert(t.loginRequired);
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

      alert(lang === "ru" ? "Резюме сохранено" : "Резюме сакталды");
      navigate("/resumes");

    } catch (error) {
      alert(lang === "ru" ? "Ошибка" : "Ката");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 className={styles.loading}>{t.loading}</h2>;
  }

  if (!user) {
    return <h2 className={styles.loading}>{t.loginRequired}</h2>;
  }

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <span>{t.title}</span>
        <h1>{t.subtitle}</h1>
        <p>{t.description}</p>
      </div>

      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSave}>
          <h2>{t.formTitle}</h2>

          <input
            name="fullName"
            placeholder={t.fullName}
            value={resume.fullName}
            onChange={handleChange}
          />

          <input
            name="profession"
            placeholder={t.profession}
            value={resume.profession}
            onChange={handleChange}
          />

          <div className={styles.row}>
            <input
              name="city"
              placeholder={t.city}
              value={resume.city}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder={t.phone}
              value={resume.phone}
              onChange={handleChange}
            />
          </div>

          <input
            name="email"
            placeholder={t.email}
            value={resume.email}
            onChange={handleChange}
          />

          <textarea
            name="about"
            placeholder={t.about}
            value={resume.about}
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder={t.skills}
            value={resume.skills}
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder={t.experience}
            value={resume.experience}
            onChange={handleChange}
          />

          <textarea
            name="education"
            placeholder={t.education}
            value={resume.education}
            onChange={handleChange}
          />

          <input
            name="portfolio"
            placeholder={t.portfolio}
            value={resume.portfolio}
            onChange={handleChange}
          />

          <button type="submit" disabled={saving}>
            {saving ? t.saving : t.save}
          </button>
        </form>

        {/* PREVIEW */}
        <div className={styles.preview}>
          <div className={styles.previewTop}>
            <div className={styles.avatar}>
              {resume.fullName ? resume.fullName[0].toUpperCase() : "R"}
            </div>

            <div>
              <h2>{resume.fullName || t.fullName}</h2>
              <p>{resume.profession || t.profession}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <span>{resume.city || t.city}</span>
            <span>{resume.phone || t.phone}</span>
            <span>{resume.email || t.email}</span>
          </div>

          <div className={styles.block}>
            <h3>{t.previewAbout}</h3>
            <p>{resume.about || ""}</p>
          </div>

          <div className={styles.block}>
            <h3>{t.previewSkills}</h3>
            <p>{resume.skills || ""}</p>
          </div>

          <div className={styles.block}>
            <h3>{t.previewExperience}</h3>
            <p>{resume.experience || ""}</p>
          </div>

          <div className={styles.block}>
            <h3>{t.previewEducation}</h3>
            <p>{resume.education || ""}</p>
          </div>

          {resume.portfolio && (
            <div className={styles.block}>
              <h3>{t.previewPortfolio}</h3>
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

export default Addresume;