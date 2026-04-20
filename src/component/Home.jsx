import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import translations from "../translations";

function Home({ lang }) {
  const navigate = useNavigate();
  const t = translations[lang];

  const [activeJob, setActiveJob] = useState(null);

  const popularJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      short: "React • Remote",
      description:
        lang === "ru"
          ? "Frontend Developer создаёт интерфейс сайта или приложения..."
          : "Frontend Developer сайттын интерфейсин түзөт...",
      salary: lang === "ru" ? "от 60 000 сом" : "60 000 сомдон баштап",
      type: lang === "ru" ? "Удалённо" : "Алыстан",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      short: "Figma • Full-time",
      description:
        lang === "ru"
          ? "UI/UX Designer проектирует удобный дизайн..."
          : "UI/UX Designer ыңгайлуу дизайн түзөт...",
      salary: lang === "ru" ? "от 45 000 сом" : "45 000 сомдон баштап",
      type: lang === "ru" ? "Полный день" : "Толук күн",
    },
    {
      id: 3,
      title: "Project Manager",
      short: "Agile • Hybrid",
      description:
        lang === "ru"
          ? "Project Manager управляет командой..."
          : "Project Manager команда менен иштейт...",
      salary: lang === "ru" ? "от 70 000 сом" : "70 000 сомдон баштап",
      type: lang === "ru" ? "Гибрид" : "Гибрид",
    },
  ];

  const handleJobClick = (id) => {
    setActiveJob(activeJob === id ? null : id);
  };

  return (
    <div className={styles.page}>

      {/* HERO */}
      <div className={styles.heroWrapper}>
        <div
          className={styles.heroBg}
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/15/6c/83/156c83ba654c8f2b091352a0a0c230fd.jpg')",
          }}
        />

        <div className={styles.heroContent}>
          <h1>{t.heroTitle1}</h1>
          <h1>{t.heroTitle2}</h1>

          <p>{t.heroText}</p>

          <button
            className={styles.heroBtn}
            onClick={() => navigate("/jobs")}
          >
            {t.heroBtn}
          </button>
        </div>
      </div>

      {/* POPULAR */}
      <section className={styles.section}>
        <h2>{t.popular}</h2>

        <div className={styles.grid}>
          {popularJobs.map((job) => (
            <div
              key={job.id}
              className={`${styles.card} ${
                activeJob === job.id ? styles.activeCard : ""
              }`}
              onClick={() => handleJobClick(job.id)}
            >
              <h3>{job.title}</h3>
              <p>{job.short}</p>

              {activeJob === job.id && (
                <div className={styles.jobInfo}>
                  <p>{job.description}</p>

                  <div className={styles.jobDetails}>
                    <span>{job.salary}</span>
                    <span>{job.type}</span>
                  </div>

                  <button className={styles.applyBtn}>
                    {lang === "ru" ? "Подробнее" : "Толугураак"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className={styles.sectionDark}>
        <h2>{t.why}</h2>

        <div className={styles.features}>
          {(lang === "ru"
            ? [
                "🚀 Быстрый поиск работы",
                "💼 Проверенные работодатели",
                "📊 Удобный интерфейс",
              ]
            : [
                "🚀 Жумушту тез табуу",
                "💼 Текшерилген иш берүүчүлөр",
                "📊 Ыңгайлуу интерфейс",
              ]
          ).map((item, i) => (
            <div key={i} className={styles.featureCard}>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <h3>Emgek.kg</h3>
        <p>{t.footerText}</p>

        <div className={styles.footerLinks}>
          <a href="#">Вакансии</a>
          <a href="#">О нас</a>
          <a href="#">Контакты</a>
        </div>

        <p className={styles.copy}>
          © 2026 Emgek.kg. Все права защищены.
        </p>
      </footer>

    </div>
  );
}

export default Home;