import React from "react";
import styles from "../styles/Home.module.css";

function Home() {
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
          <div className={styles.card}>
            <h3>Frontend Developer</h3>
            <p>React • Remote</p>
          </div>

          <div className={styles.card}>
            <h3>UI/UX Designer</h3>
            <p>Figma • Full-time</p>
          </div>

          <div className={styles.card}>
            <h3>Project Manager</h3>
            <p>Agile • Hybrid</p>
          </div>
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