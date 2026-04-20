import React, { useEffect, useMemo, useState } from "react";
import style from "../styles/FindJob.module.css";

import {
  isFavorite,
  toggleFavorite as toggleFavStorage,
} from "../favorites";

function FindJob({ city = "all", jobs = [] }) {
  const [category, setCategory] = useState("all");
  const [schedule, setSchedule] = useState("all");
  const [paymentType, setPaymentType] = useState("all");
  const [format, setFormat] = useState("all");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState({});

  // 📌 Дефолтные вакансии
  const defaultVacancies = [
    {
      id: 1,
      title: "Официант",
      city: "Бишкек",
      category: "Подработка",
      schedule: "Вечер",
      paymentType: "Почасовая",
      format: "Офис",
      salary: 18000,
    },
    {
      id: 2,
      title: "Оператор call-центра",
      city: "Ош",
      category: "Для студентов",
      schedule: "День",
      paymentType: "Ежемесячная",
      format: "Удаленно",
      salary: 25000,
    },
    {
      id: 3,
      title: "SMM-менеджер",
      city: "Бишкек",
      category: "Работа из дома",
      schedule: "Гибкий",
      paymentType: "Ежемесячная",
      format: "Удаленно",
      salary: 40000,
    },
  ];

  const allVacancies = useMemo(() => {
    return [...jobs, ...defaultVacancies];
  }, [jobs]);

  // ❤️ загрузка избранного
  useEffect(() => {
    const favState = {};

    allVacancies.forEach((job) => {
      favState[job.id] = isFavorite(job.id);
    });

    setFavorites(favState);
  }, [allVacancies]);

  // ❤️ toggle избранного
  const toggleFavorite = (job) => {
    toggleFavStorage(job);

    setFavorites((prev) => ({
      ...prev,
      [job.id]: !prev[job.id],
    }));
  };

  // 🔍 Фильтрация вакансий
  const filteredVacancies = useMemo(() => {
    return allVacancies
      .filter((item) =>
        search
          ? item.title.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((item) => (city === "all" ? true : item.city === city))
      .filter((item) =>
        category === "all" ? true : item.category === category
      )
      .filter((item) =>
        schedule === "all" ? true : item.schedule === schedule
      )
      .filter((item) =>
        paymentType === "all" ? true : item.paymentType === paymentType
      )
      .filter((item) =>
        format === "all" ? true : item.format === format
      )
      .filter((item) =>
        salaryFrom === "" ? true : item.salary >= Number(salaryFrom)
      );
  }, [
    search,
    city,
    category,
    schedule,
    paymentType,
    format,
    salaryFrom,
    allVacancies,
  ]);

  return (
    <div className={style.page}>

      {/* HERO */}
      <div className={style.hero}>
        <h1>Найти работу</h1>
        <p>Выбери вакансию и откликнись за пару секунд</p>
      </div>

      {/* FILTERS */}
      <div className={style.filters}>

        <input
          className={style.search}
          type="text"
          placeholder="Поиск вакансии"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Все категории</option>
          <option value="Подработка">Подработка</option>
          <option value="Работа из дома">Работа из дома</option>
          <option value="Для студентов">Для студентов</option>
          <option value="Физическая работа">Физическая работа</option>
          <option value="Стажировка">Стажировка</option>
        </select>

        <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
          <option value="all">График</option>
          <option value="Утро">Утро</option>
          <option value="День">День</option>
          <option value="Вечер">Вечер</option>
          <option value="Гибкий">Гибкий</option>
        </select>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="all">Оплата</option>
          <option value="Почасовая">Почасовая</option>
          <option value="Ежедневная">Ежедневная</option>
          <option value="Ежемесячная">Ежемесячная</option>
        </select>

        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="all">Формат</option>
          <option value="Офис">Офис</option>
          <option value="Удаленно">Удаленно</option>
          <option value="Гибрид">Гибрид</option>
        </select>

        <input
          type="number"
          placeholder="Зарплата от"
          value={salaryFrom}
          onChange={(e) => setSalaryFrom(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className={style.cards}>

        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((job) => (
            <div key={job.id} className={style.card}>

              <div className={style.left}>
                <h3 className={style.title}>{job.title}</h3>

                <div className={style.info}>
                  <p>Город: {job.city}</p>
                  <p>Категория: {job.category}</p>
                  <p>График: {job.schedule}</p>
                  <p>Оплата: {job.paymentType}</p>
                  <p>Формат: {job.format}</p>
                </div>
              </div>

              <div className={style.line}></div>

              <div className={style.right}>

                <div className={style.top}>
                  <div className={style.salary}>
                    {job.salary} сом
                  </div>

                  <button
                    className={`${style.heart} ${
                      favorites[job.id] ? style.activeHeart : ""
                    }`}
                    onClick={() => toggleFavorite(job)}
                  >
                    ♥
                  </button>
                </div>

                <button className={style.applyBtn}>
                  Откликнуться
                </button>

              </div>

            </div>
          ))
        ) : (
          <p className={style.empty}>
            Вакансий не найдено
          </p>
        )}

      </div>
    </div>
  );
}

export default FindJob;