import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Instructions.module.css";

function Instructions({ lang = "ru" }) {
  const navigate = useNavigate();

  const text = {
    ru: {
      title: "Инструкция для новых пользователей",
      subtitle:
        "Здесь вы узнаете, как пользоваться сайтом Emgek: искать работу, создавать резюме и откликаться на вакансии.",
      seekerTitle: "Для соискателей",
      employerTitle: "Для работодателей",
      steps: [
        {
          number: "01",
          title: "Зарегистрируйтесь",
          desc: "Создайте аккаунт, чтобы сохранять резюме, откликаться на вакансии и пользоваться личным кабинетом.",
        },
        {
          number: "02",
          title: "Создайте резюме",
          desc: "Заполните имя, профессию, город, навыки, опыт и контакты. После сохранения резюме появится на странице резюме.",
        },
        {
          number: "03",
          title: "Найдите вакансию",
          desc: "Откройте страницу вакансий и используйте поиск, город, категорию, график, формат и зарплату.",
        },
        {
          number: "04",
          title: "Откликнитесь",
          desc: "Нажмите кнопку «Откликнуться». Ваш отклик появится в разделе «Мои отклики».",
        },
        {
          number: "05",
          title: "Добавляйте в избранное",
          desc: "Нажмите на сердечко возле вакансии, чтобы сохранить её в избранные вакансии.",
        },
      ],
      employerSteps: [
        {
          title: "Ищу сотрудника",
          desc: "Перейдите в раздел «Ищу сотрудника», чтобы узнать, как разместить вакансию.",
        },
        {
          title: "Смотрите резюме",
          desc: "Откройте страницу «Резюме» и просматривайте кандидатов, которые уже сохранили свои данные.",
        },
        {
          title: "Публикуйте вакансию",
          desc: "Добавьте название, описание, город, категорию, зарплату и формат работы.",
        },
      ],
      buttons: {
        register: "Регистрация",
        jobs: "Смотреть вакансии",
        resume: "Создать резюме",
        resumes: "Смотреть резюме",
      },
    },

    kg: {
      title: "Жаңы колдонуучулар үчүн нускама",
      subtitle:
        "Бул жерден Emgek сайтын кантип колдонуу керек экенин билесиз: жумуш издөө, резюме түзүү жана вакансияга жооп берүү.",
      seekerTitle: "Жумуш издегендер үчүн",
      employerTitle: "Жумуш берүүчүлөр үчүн",
      steps: [
        {
          number: "01",
          title: "Катталыңыз",
          desc: "Аккаунт түзсөңүз, резюме сактап, вакансияларга жооп берип, жеке кабинетти колдоно аласыз.",
        },
        {
          number: "02",
          title: "Резюме түзүңүз",
          desc: "Атыңызды, кесибиңизди, шаарды, жөндөмдөрдү, тажрыйбаны жана байланыштарды толтуруңуз.",
        },
        {
          number: "03",
          title: "Вакансия табыңыз",
          desc: "Вакансиялар барагын ачып, издөө, шаар, категория, график жана айлык боюнча фильтр колдонуңуз.",
        },
        {
          number: "04",
          title: "Отклик жөнөтүңүз",
          desc: "«Откликнуться» баскычын басыңыз. Отклик «Мои отклики» бөлүмүндө көрүнөт.",
        },
        {
          number: "05",
          title: "Тандалмаларга кошуңуз",
          desc: "Вакансиянын жанындагы жүрөкчөнү басып, аны тандалмаларга сактаңыз.",
        },
      ],
      employerSteps: [
        {
          title: "Кызматкер издейм",
          desc: "Вакансия жайгаштыруу үчүн «Кызматкер издейм» бөлүмүнө өтүңүз.",
        },
        {
          title: "Резюмелерди көрүңүз",
          desc: "«Резюме» барагын ачып, талапкерлердин маалыматтарын көрүңүз.",
        },
        {
          title: "Вакансия жарыялаңыз",
          desc: "Аталышын, сүрөттөмөсүн, шаарын, категориясын, айлыгын жана иш форматын кошуңуз.",
        },
      ],
      buttons: {
        register: "Катталуу",
        jobs: "Вакансияларды көрүү",
        resume: "Резюме түзүү",
        resumes: "Резюмелерди көрүү",
      },
    },
  };

  const t = text[lang] || text.ru;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.badge}>EMGEK GUIDE</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <div className={styles.heroButtons}>
          <button onClick={() => navigate("/register")}>
            {t.buttons.register}
          </button>

          <button onClick={() => navigate("/jobs")}>
            {t.buttons.jobs}
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>01</span>
          <h2>{t.seekerTitle}</h2>
        </div>

        <div className={styles.steps}>
          {t.steps.map((step) => (
            <div className={styles.card} key={step.number}>
              <div className={styles.number}>{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span>02</span>
          <h2>{t.employerTitle}</h2>
        </div>

        <div className={styles.employerGrid}>
          {t.employerSteps.map((item, index) => (
            <div className={styles.employerCard} key={index}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.bottom}>
        <h2>{lang === "ru" ? "Быстрые действия" : "Тез аракеттер"}</h2>

        <div className={styles.actions}>
          <button onClick={() => navigate("/post-resume")}>
            {t.buttons.resume}
          </button>

          <button onClick={() => navigate("/resumes")}>
            {t.buttons.resumes}
          </button>

          <button onClick={() => navigate("/jobs")}>
            {t.buttons.jobs}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Instructions;