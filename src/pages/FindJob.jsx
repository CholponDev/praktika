import React, { useEffect, useMemo, useState } from "react";
import style from "../styles/FindJob.module.css";
import { useNavigate } from "react-router-dom";

import {
  isFavorite,
  toggleFavorite as toggleFavStorage,
} from "../favorites";

import translations from "../translations";

function FindJob({ city = "all", jobs = [], lang }) {
  const t = translations.findJob[lang];
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [schedule, setSchedule] = useState("all");
  const [paymentType, setPaymentType] = useState("all");
  const [format, setFormat] = useState("all");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState({});

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

  useEffect(() => {
    const favState = {};

    allVacancies.forEach((job) => {
      favState[job.id] = isFavorite(job.id);
    });

    setFavorites(favState);
  }, [allVacancies]);

  const toggleFavorite = (job) => {
    toggleFavStorage(job);

    setFavorites((prev) => ({
      ...prev,
      [job.id]: !prev[job.id],
    }));
  };

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
      .filter((item) => (format === "all" ? true : item.format === format))
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

  const handleApply = (job) => {
    const oldApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      id: Date.now(),
      title: job.title,
      company: job.company || job.employerName || "Компания не указана",
      status: "pending",
    };

    localStorage.setItem(
      "applications",
      JSON.stringify([...oldApplications, newApplication])
    );

    navigate("/applications");
  };

  return (
    <div className={style.page}>
      {/* HERO */}
      <div className={style.hero}>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      {/* FILTERS */}
      <div className={style.filters}>
        <input
          className={style.search}
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">{t.allCategories}</option>
          <option value="Подработка">{t.categories.partTime}</option>
          <option value="Работа из дома">{t.categories.home}</option>
          <option value="Для студентов">{t.categories.students}</option>
          <option value="Физическая работа">{t.categories.physical}</option>
          <option value="Стажировка">{t.categories.internship}</option>
        </select>

        <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
          <option value="all">{t.schedule}</option>
          <option value="Утро">Утро</option>
          <option value="День">День</option>
          <option value="Вечер">Вечер</option>
          <option value="Гибкий">Гибкий</option>
        </select>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="all">{t.payment}</option>
          <option value="Почасовая">Почасовая</option>
          <option value="Ежедневная">Ежедневная</option>
          <option value="Ежемесячная">Ежемесячная</option>
        </select>

        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="all">{t.format}</option>
          <option value="Офис">Офис</option>
          <option value="Удаленно">Удаленно</option>
          <option value="Гибрид">Гибрид</option>
        </select>

        <input
          type="number"
          placeholder={t.salaryFrom}
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
                  <p>
                    <span>{t.city}:</span> {job.city}
                  </p>
                  <p>
                    <span>{t.category}:</span> {job.category}
                  </p>
                  <p>
                    <span>{t.schedule}:</span> {job.schedule}
                  </p>
                  <p>
                    <span>{t.payment}:</span> {job.paymentType}
                  </p>
                  <p>
                    <span>{t.format}:</span> {job.format}
                  </p>
                </div>

                {(job.employerName || job.phone || job.email) && (
                  <div className={style.contacts}>
                    <h4>
                      {lang === "ru"
                        ? "Контакты работодателя"
                        : "Иш берүүчүнүн байланыштары"}
                    </h4>

                    {job.employerName && (
                      <p>
                        <span>
                          {lang === "ru" ? "Работодатель" : "Иш берүүчү"}:
                        </span>{" "}
                        {job.employerName}
                      </p>
                    )}

                    {job.phone && (
                      <p>
                        <span>
                          {lang === "ru" ? "Телефон" : "Телефон"}:
                        </span>{" "}
                        {job.phone}
                      </p>
                    )}

                    {job.email && (
                      <p>
                        <span>Email:</span> {job.email}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className={style.line}></div>

              <div className={style.right}>
                <div className={style.top}>
                  <div className={style.salary}>{job.salary} сом</div>

                  <button
                    type="button"
                    className={`${style.heart} ${
                      favorites[job.id] ? style.activeHeart : ""
                    }`}
                    onClick={() => toggleFavorite(job)}
                  >
                    ♥
                  </button>
                </div>

                <button
                  type="button"
                  className={style.applyBtn}
                  onClick={() => handleApply(job)}
                >
                  {t.apply}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={style.empty}>{t.notFound}</p>
        )}
      </div>
    </div>
  );
}

export default FindJob;