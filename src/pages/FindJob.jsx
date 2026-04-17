import React, { useMemo, useState } from "react";
import Header from "../component/Header";
import style from "../styles/FindJob.module.css";

function FindJob({city = "all"}) {
  const [category, setCategory] = useState("all");
  const [schedule, setSchedule] = useState("all");
  const [paymentType, setPaymentType] = useState("all");
  const [format, setFormat] = useState("all");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [search, setSearch] = useState("");

  const vacancies = [
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
    {
      id: 4,
      title: "Курьер",
      city: "Каракол",
      category: "Физическая работа",
      schedule: "День",
      paymentType: "Ежедневная",
      format: "Офис",
      salary: 22000,
    },
    {
      id: 5,
      title: "Уборка квартиры",
      city: "Бишкек",
      category: "Домашние услуги",
      schedule: "Часовая",
      paymentType: "Почасовая",
      format: "Офис",
      salary: 15000,
    },
    {
      id: 6,
      title: "Frontend стажер",
      city: "Нарын",
      category: "Стажировка",
      schedule: "День",
      paymentType: "Ежемесячная",
      format: "Гибрид",
      salary: 20000,
    },
  ];

  const filteredVacancies = useMemo(() => {
    return vacancies
      .filter((item) =>
        search.trim() === ""
          ? true
          : item.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) => (city === "all" ? true : item.city === city))
      .filter((item) => (category === "all" ? true : item.category === category))
      .filter((item) => (schedule === "all" ? true : item.schedule === schedule))
      .filter((item) =>
        paymentType === "all" ? true : item.paymentType === paymentType
      )
      .filter((item) => (format === "all" ? true : item.format === format))
      .filter((item) =>
        salaryFrom === "" ? true : item.salary >= Number(salaryFrom)
      );
  }, [search, city, category, schedule, paymentType, format, salaryFrom]);

  return (
    <div className={style.page}>

      <div className={style.hero}>
        <h1>Найди работу под себя</h1>
        <p>Выбери категорию, график, формат и город</p>
      </div>

      <div className={style.filters}>
        <input
          className={style.search}
          type="text"
          placeholder="Поиск по названию вакансии"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Все категории</option>
          <option value="Подработка">Подработка</option>
          <option value="Работа из дома">Работа из дома</option>
          <option value="Для студентов">Для студентов</option>
          <option value="Удаленно">Удаленно</option>
          <option value="Без опыта">Без опыта</option>
          <option value="Физическая работа">Физическая работа</option>
          <option value="Домашние услуги">Домашние услуги</option>
          <option value="Стажировка">Стажировка</option>
        </select>

        <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
          <option value="all">Любой график</option>
          <option value="Утро">Утро</option>
          <option value="День">День</option>
          <option value="Вечер">Вечер</option>
          <option value="Ночь">Ночь</option>
          <option value="Гибкий">Гибкий</option>
          <option value="Часовая">Часовая</option>
        </select>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="all">Тип оплаты</option>
          <option value="Почасовая">Почасовая</option>
          <option value="Ежедневная">Ежедневная</option>
          <option value="Еженедельная">Еженедельная</option>
          <option value="Ежемесячная">Ежемесячная</option>
        </select>

        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="all">Любой формат</option>
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

      <div className={style.cards}>
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map((job) => (
            <div key={job.id} className={style.card}>
              <h3>{job.title}</h3>
              <p><strong>Город:</strong> {job.city}</p>
              <p><strong>Категория:</strong> {job.category}</p>
              <p><strong>График:</strong> {job.schedule}</p>
              <p><strong>Оплата:</strong> {job.paymentType}</p>
              <p><strong>Формат:</strong> {job.format}</p>
              <p><strong>Зарплата:</strong> {job.salary} сом</p>
              <button className={style.cardBtn}>Откликнуться</button>
            </div>
          ))
        ) : (
          <p className={style.empty}>По этим фильтрам вакансий пока нет</p>
        )}
      </div>
    </div>
  );
}

export default FindJob;