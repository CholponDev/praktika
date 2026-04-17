import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import style from "../styles/PostJob.module.css";
import translations from "../translations";

function PostJob({ addJob, lang }) {
  const navigate = useNavigate();
  const t = translations[lang];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      title: e.target.title.value,
      experience: e.target.experience.value,
      conditions: e.target.conditions.value,
      format: e.target.format.value,
      schedule: e.target.schedule.value,
      paymentType: e.target.payment.value,
      salary: Number(e.target.salary.value),
      city: "Бишкек",
    };

    addJob(newJob);
    navigate("/jobs");
  };

  return (
    <motion.div
      className={style.page}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.5 }}
    >
      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>{t.newJob}</h1>
        </div>

        <form onSubmit={handleSubmit} className={style.form}>
          
          {/* Название */}
          <div className={style.card}>
            <h2>{t.title}</h2>
            <input
              type="text"
              placeholder={
                lang === "ru"
                  ? "Профессия или должность"
                  : "Кесип же кызмат"
              }
              name="title"
              required
              className={style.input}
            />
          </div>

          {/* Опыт */}
          <div className={style.card}>
            <h2>{t.experience}</h2>
            <div className={style.options}>
              {(lang === "ru"
                ? ["Без опыта", "1–3 года", "3–6 лет", "6+ лет"]
                : ["Тажрыйбасыз", "1–3 жыл", "3–6 жыл", "6+ жыл"]
              ).map((item) => (
                <label key={item} className={style.radioCard}>
                  <input type="radio" name="experience" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Условия */}
          <div className={style.card}>
            <h2>{t.conditions}</h2>
            <div className={style.options}>
              {(lang === "ru"
                ? [
                    "Полный рабочий день",
                    "Частичная занятость",
                    "Проектная работа",
                    "Гибкий график",
                  ]
                : [
                    "Толук жумуш күнү",
                    "Жарым ставка",
                    "Долбоордук иш",
                    "Ийкемдүү график",
                  ]
              ).map((item) => (
                <label key={item} className={style.radioCard}>
                  <input type="radio" name="conditions" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Формат */}
          <div className={style.card}>
            <h2>{t.format}</h2>
            <div className={style.options}>
              {(lang === "ru"
                ? [
                    "Офис",
                    "Удаленно",
                    "Гибрид",
                    "Разъездной",
                    "Международный",
                  ]
                : [
                    "Кеңсе",
                    "Алыстан",
                    "Гибрид",
                    "Көчмө",
                    "Эл аралык",
                  ]
              ).map((item) => (
                <label key={item} className={style.radioCard}>
                  <input type="radio" name="format" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* График */}
          <div className={style.card}>
            <h2>{t.schedule}</h2>
            <div className={style.options}>
              {["6/1", "5/2", "4/2", "Сменный", "Гибкий"].map((item) => (
                <label key={item} className={style.radioCard}>
                  <input type="radio" name="schedule" value={item} />
                  <span>
                    {lang === "ru"
                      ? item
                      : item === "Сменный"
                      ? "Сменалык"
                      : item === "Гибкий"
                      ? "Ийкемдүү"
                      : item}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Оплата */}
          <div className={style.card}>
            <h2>
              {lang === "ru" ? "Частота оплаты" : "Төлөм жыштыгы"}
            </h2>

            <select
              name="payment"
              className={style.input}
              defaultValue=""
              required
            >
              <option value="" disabled>
                {lang === "ru"
                  ? "Выберите из списка"
                  : "Тизмеден тандаңыз"}
              </option>

              {(lang === "ru"
                ? ["Ежедневно", "Еженедельно", "Ежемесячно", "По проекту"]
                : ["Күн сайын", "Жума сайын", "Ай сайын", "Долбоор боюнча"]
              ).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Зарплата */}
          <div className={style.card}>
            <h2>{t.salary}</h2>
            <input
              type="number"
              name="salary"
              className={style.input}
              placeholder={
                lang === "ru" ? "Введите сумму" : "Сумманы жазыңыз"
              }
            />
          </div>

          <button type="submit" className={style.button}>
            {t.publish}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default PostJob;