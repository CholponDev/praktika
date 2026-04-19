import React, { useEffect, useState } from "react";
import styles from "../styles/Applications.module.css";
import { useNavigate } from "react-router-dom";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("applications");
    if (data) {
      setApplications(JSON.parse(data));
    }
  }, []);

  const filteredApplications = applications.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase()) ||
    app.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мои отклики</h1>

      {/* 🔍 SEARCH */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Поиск вакансии или компании..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setSearch(search)}>Найти</button>
      </div>

      {/* ❗ EMPTY STATE */}
      {filteredApplications.length === 0 ? (
        <div className={styles.empty}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="empty"
            className={styles.image}
          />

          <p>В данный момент у вас нет ни одного отклика</p>

          <button
            className={styles.mainButton}
            onClick={() => navigate("/jobs")}
          >
            Поиск вакансий
          </button>
        </div>
      ) : (
        /* ✅ LIST */
        <div className={styles.list}>
          {filteredApplications.map((app) => (
            <div key={app.id} className={styles.card}>
              <h3>{app.title}</h3>
              <p>{app.company}</p>

              <span className={`${styles.status} ${styles[app.status]}`}>
                {app.status === "pending" && "В ожидании"}
                {app.status === "accepted" && "Принято"}
                {app.status === "rejected" && "Отклонено"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;