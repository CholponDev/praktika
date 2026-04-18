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
      conditions: e.target.conditions?.value,
      format: e.target.format?.value,
      schedule: e.target.schedule?.value,
      hours: e.target.hours?.value,
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      <div className={style.container}>
        <h1 className={style.title}>{t.newJob}</h1>

        <form onSubmit={handleSubmit} className={style.form}>
          
          {/* Название */}
          <div className={style.section}>
            <h2>{t.title}</h2>
            <input
              type="text"
              name="title"
              required
              className={style.input}
              placeholder={
                lang === "ru"
                  ? "Профессия или должность"
                  : "Кесип же кызмат"
              }
            />
          </div>

          {/* Опыт */}
          <div className={style.section}>
            <h2>{t.experience}</h2>
            <div className={style.chips}>
              {(lang === "ru"
                ? ["Без опыта", "1–3 года", "3–6 лет", "6+ лет"]
                : ["Тажрыйбасыз", "1–3 жыл", "3–6 жыл", "6+ жыл"]
              ).map((item) => (
                <label key={item} className={style.chip}>
                  <input type="radio" name="experience" value={item} required />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Условия */}
          <div className={style.section}>
            <h2>{t.conditions}</h2>
            <div className={style.chips}>
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
                <label key={item} className={style.chip}>
                  <input type="radio" name="conditions" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Формат */}
          <div className={style.section}>
            <h2>{t.format}</h2>
            <div className={style.chips}>
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
                <label key={item} className={style.chip}>
                  <input type="radio" name="format" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* График и часы */}
          <div className={style.section}>
            <h2>График и часы работы</h2>

            <p className={style.sub}>График работы</p>
            <div className={style.chips}>
              {[
                "6/1","5/2","4/4","4/3","4/2",
                "3/3","3/2","2/2","2/1",
                "1/3","1/2",
                "По выходным","Свободный","Другое"
              ].map((item) => (
                <label key={item} className={style.chip}>
                  <input type="radio" name="schedule" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <p className={style.sub}>Рабочие часы в день</p>
            <div className={style.circleGroup}>
              {[2,3,4,5,6,7,8,9,10,11,12,24].map((item) => (
                <label key={item} className={style.circle}>
                  <input type="radio" name="hours" value={item} />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Оплата */}
          <div className={style.section}>
            <h2>
              {lang === "ru"
                ? "Частота оплаты"
                : "Төлөм жыштыгы"}
            </h2>

            <select
              name="payment"
              required
              defaultValue=""
              className={style.input}
            >
              <option value="" disabled>
                {lang === "ru"
                  ? "Выберите"
                  : "Тандаңыз"}
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
          <div className={style.section}>
            <h2>{t.salary}</h2>
            <input
              type="number"
              name="salary"
              className={style.input}
              placeholder={
                lang === "ru"
                  ? "Введите сумму"
                  : "Сумманы жазыңыз"
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