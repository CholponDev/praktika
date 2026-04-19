import React, { useEffect, useState } from "react";
import { getFavorites, removeFromFavorites } from "../favorites";

function Favorites() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFromFavorites(id);
    setJobs(getFavorites());
  };

  if (jobs.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Нет избранных вакансий</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Избранные вакансии</h2>

      <div style={{ marginTop: "20px" }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff",
            }}
          >
            <h3>{job.title}</h3>

            <p>Город: {job.city}</p>
            <p>Категория: {job.category}</p>
            <p>График: {job.schedule}</p>
            <p>Оплата: {job.paymentType}</p>
            <p>Формат: {job.format}</p>
            <p>Зарплата: {job.salary} сом</p>

            <button
              onClick={() => handleRemove(job.id)}
              style={{
                marginTop: "10px",
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Удалить из избранного
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;