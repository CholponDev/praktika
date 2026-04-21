import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import translations from "../translations";

function Home({ lang }) {
  const navigate = useNavigate();
  const t = translations[lang];

 {/* <button className={styles.applyBtn}>
                    {lang === "ru"
                      ? "Смотреть вакансии"
                      : "Жумуштарды көрүү"}
                  </button> */}

 const popularJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    description:
    lang === "ru" ? "Создаёт внешний вид сайта: кнопки, страницы, формы и удобный интерфейс для пользователей." : "Сайттын сырткы көрүнүшүн түзөт: баскычтар, барактар, формалар жана колдонуучулар үчүн ыңгайлуу интерфейс.",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    description:
    lang === "ru" ? "Продумывает дизайн сайта или приложения: цвета, расположение блоков и удобство использования." :
      "Сайттын же колдонмонун дизайнын ойлонуп чыгат: түстөрдү, блоктордун жайгашуусун жана колдонууга ыңгайлуулугун түзөт.",
  },
  {
    id: 3,
    title: "Project Manager",
    description:
    lang === "ru" ?
      "Организует работу команды, следит за задачами, сроками и общением между участниками проекта." :
      "Команданын ишин уюштурат, тапшырмаларга, мөөнөттөргө жана долбоордун катышуучуларынын ортосундагы байланышка көзөмөл жүргүзөт.",
  },
];

  const articles = [
    {
      id: 1,
      title:
      lang === "ru" ?
      "Как пережить отказы при поиске работы?" :
      "Жумуш издеп жатканда баш тартууларды кантип жеңип чыгуу керек?" ,
      image:
        "https://i.pinimg.com/1200x/48/8a/c9/488ac945296daa146cfa83d65786c206.jpg",
    },
    {
      id: 2,
      title: 
      lang === "ru" ? 
      "Как найти работу без опыта?" :
      "Тажрыйбасыз жумушту кантип табуу керек?" ,
      image:
        "https://i.pinimg.com/736x/24/76/98/2476983dd0ed5f1f0af3be5f2f8972a5.jpg",
    },
    {
      id: 3,
      title: 
      lang === "ru" ? 
      "Чем заняться во время поиска работы?" :
      "Жумуш издеп жатканда эмне кылуу керек?" ,
      image:
        "https://i.pinimg.com/736x/74/0a/4c/740a4c8f17b0274677b25aeba6efddb4.jpg",
    },
    {
      id: 4,
      title: 
      lang === "ru" ? 
      "Какую зарплату указать в резюме?" :
      "Резюмеге кандай маяна көрсөтүү керек?" ,
      image:
        "https://i.pinimg.com/736x/f0/ca/de/f0cadea94ad80131e2602051c794f627.jpg",
    },
    {
      id: 5,
      title: 
      lang === "ru" ? 
      "Как совмещать работу с учебой?" :
      "Жумуш менен окууну кантип айкалыштыруу керек?" ,
      image:
        "https://i.pinimg.com/1200x/bd/c1/d5/bdc1d541c01362d274dd21b494b19e4f.jpg",
    },
    {
      id: 6,
      title: 
      lang === "ru" ? 
      "5 способов успокоиться перед собеседованием" :
      "Сүйлөшүү алдында тынчтануунун 5 жолу" ,
      image:
        "https://i.pinimg.com/736x/43/ab/ee/43abeead8d10e9a6e13efe439185ee14.jpg",
    },
  ];

 

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
  <h2>{lang === "ru" ? "Популярные вакансии" : "Популярдуу вакансиялар"}</h2>

  <div className={styles.grid}>
    {popularJobs.map((job) => (
      <div key={job.id} className={styles.card}>
        <h3>{job.title}</h3>
        <p>{job.description}</p>
      </div>
    ))}
  </div>
</section>

      {/* ARTICLES (UPDATED FIXED) */}
      <section className={styles.section}>
        <h2>{lang === "ru" ? "Полезные статьи" : "Пайдалуу кенештер"}</h2>

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
          <a href="#"> {lang === "ru" ?"Вакансии" : "Вакансиялар"}</a>
          <a href="#"> {lang === "ru" ?"О нас" :"Биз жонундо"}</a>
          <a href="#"> {lang === "ru" ?"Контакты" :"Байланыштар"}</a>
        </div>

        <p className={styles.copy}>
          {lang === "ru" ? "© 2026 Emgek.kg. Все права защищены." : "© 2026 Emgek.kg. Бардык укуктар корголгон."}

        </p>
      </footer>

    </div>
  );
}

export default Home;