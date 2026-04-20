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
      title: "Frontend разработчик",
      city: "Бишкек",
      salary: "50 000 сом",
      format: "Удаленно",
    },
    {
      id: 2,
      title: "Менеджер по работе с клиентами",
      city: "Бишкек",
      salary: "45 000 сом",
      format: "Офис",
    },
    {
      id: 3,
      title: "SMM-менеджер",
      city: "Бишкек",
      salary: "40 000 сом",
      format: "Удаленно",
    },
  ];

  const articles = [
    {
      id: 1,
      title: "Как пережить отказы при поиске работы?",
      image:
        "https://i.pinimg.com/1200x/48/8a/c9/488ac945296daa146cfa83d65786c206.jpg",
    },
    {
      id: 2,
      title: "Как найти работу без опыта?",
      image:
        "https://i.pinimg.com/736x/24/76/98/2476983dd0ed5f1f0af3be5f2f8972a5.jpg",
    },
    {
      id: 3,
      title: "Чем заняться во время поиска работы?",
      image:
        "https://i.pinimg.com/736x/74/0a/4c/740a4c8f17b0274677b25aeba6efddb4.jpg",
    },
    {
      id: 4,
      title: "Какую зарплату указать в резюме?",
      image:
        "https://i.pinimg.com/736x/f0/ca/de/f0cadea94ad80131e2602051c794f627.jpg",
    },
    {
      id: 5,
      title: "Как совмещать работу с учебой?",
      image:
        "https://i.pinimg.com/1200x/bd/c1/d5/bdc1d541c01362d274dd21b494b19e4f.jpg",
    },
    {
      id: 6,
      title: "5 способов успокоиться перед собеседованием",
      image:
        "https://i.pinimg.com/736x/43/ab/ee/43abeead8d10e9a6e13efe439185ee14.jpg",
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

      {/* POPULAR JOBS */}
      <section className={styles.section}>
        <h2>{t.popular}</h2>

        <div className={styles.grid}>
          {popularJobs.map((item) => (
            <div
              key={item.id}
              className={`${styles.card} ${
                activeJob === item.id ? styles.activeCard : ""
              }`}
              onClick={() => handleJobClick(item.id)}
            >
              <h3>{item.title}</h3>

              <p className={styles.countText}>{item.city}</p>
              <p className={styles.salaryText}>{item.salary}</p>
              <p className={styles.countText}>{item.format}</p>

              {activeJob === item.id && (
                <div className={styles.jobInfo}>
                  <button className={styles.applyBtn}>
                    {lang === "ru"
                      ? "Смотреть вакансии"
                      : "Жумуштарды көрүү"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLES (UPDATED FIXED) */}
      <section className={styles.section}>
        <h2>Полезные статьи</h2>

        <div className={styles.grid}>
          {articles.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => navigate(`/article/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  marginBottom: "12px",
                }}
              />

              <h3>{item.title}</h3>

              <p className={styles.countText}>
                Читать статью →
              </p>
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
                "Быстрый поиск работы",
                "Проверенные работодатели",
                "Удобный интерфейс",
              ]
            : [
                "Жумушту тез табуу",
                "Текшерилген иш берүүчүлөр",
                "Ыңгайлуу интерфейс",
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