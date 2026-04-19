import React from 'react'
import styles from "../styles/Home.module.css"

function Home() {
  return (
      <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <h1 style={styles.heroTitle}>Найди работу мечты 💼</h1>
          <p style={styles.heroText}>
            Добавляй вакансии и находи лучших специалистов
          </p>
        </div>
      </div>

    </div>
  )
}

export default Home