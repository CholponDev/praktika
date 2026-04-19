import React from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";

function Home() {
  const [activeJob, setActiveJob] = useState(null);

const popularJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    short: "React • Remote",
    description:
      "Frontend Developer создаёт интерфейс сайта или приложения. Нужно знать HTML, CSS, JavaScript, React и уметь работать с API.",
    salary: "от 60 000 сом",
    type: "Удалённо",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    short: "Figma • Full-time",
    description:
      "UI/UX Designer проектирует удобный и красивый дизайн сайта. Работает с Figma, прототипами, цветами и пользовательским опытом.",
    salary: "от 45 000 сом",
    type: "Полный день",
  },
  {
    id: 3,
    title: "Project Manager",
    short: "Agile • Hybrid",
    description:
      "Project Manager управляет командой и задачами проекта. Следит за сроками, общается с клиентами и помогает команде работать быстрее.",
    salary: "от 70 000 сом",
    type: "Гибрид",
  },
];

const handleJobClick = (id) => {
  setActiveJob(activeJob === id ? null : id);
};
  return (
    <div className={styles.page}>

      {/* HERO (как RecruitInfo стиль) */}
      <div className={styles.heroWrapper}>

        {/* BACKGROUND */}
        <div
          className={styles.heroBg}
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/c0/76/f5/c076f5e99914587b7b33d4c81dd463cb.jpg')"
          }}
        />

        {/* CONTENT */}
        <div className={styles.heroContent}>
          <h1>Найди работу быстрее</h1>
          <h1>чем когда-либо 💼</h1>

          <p>
            Emgek.kg — современная платформа для поиска вакансий и сотрудников
          </p>

          <button className={styles.heroBtn}>
            Найти вакансии
          </button>
        </div>
      </div>

      {/* POPULAR JOBS */}
      <section className={styles.section}>
      <h2>Популярные вакансии</h2>

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
              Подробнее
            </button>
            </div>
          )}
          </div>
        ))}
        </div>
       </section>

      {/* WHY US */}
      <section className={styles.sectionDark}>
        <h2>Почему Emgek.kg?</h2>

        <div className={styles.features}>
          <div className={styles.featureCard}>🚀 Быстрый поиск работы</div>
          <div className={styles.featureCard}>💼 Проверенные работодатели</div>
          <div className={styles.featureCard}>📊 Удобный интерфейс</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <h3>Emgek.kg</h3>
        <p>Найдите работу или сотрудников за пару кликов</p>

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