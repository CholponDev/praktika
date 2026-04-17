import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import translations from "../translations";

function RecruitInfo({ lang }) {
  const navigate = useNavigate();
  const t = translations[lang];

  const handleClick = () => {
    setTimeout(() => {
      navigate("/post-job");
    }, 400);
  };

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* BACKGROUND */}
      <div style={styles.overlay} />

      {/* CONTENT */}
      <motion.div
        style={styles.center}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 style={styles.title}>{t.recruitTitle1}</h1>
        <h1 style={styles.title}>{t.recruitTitle2}</h1>

        <p style={styles.text}>{t.recruitText}</p>

        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          {t.postJob}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "url('https://i.pinimg.com/1200x/c0/76/f5/c076f5e99914587b7b33d4c81dd463cb.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(0.55) saturate(1.1)",
  },

  center: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
  },

  title: {
    fontSize: "54px",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.88)",
    margin: "0",
    lineHeight: "1.05",
    letterSpacing: "-1px",
    textShadow: "0 10px 30px rgba(0,0,0,0.45)",
  },

  text: {
    marginTop: "20px",
    fontSize: "17px",
    color: "rgba(255,255,255,0.85)",
    maxWidth: "420px",
    lineHeight: "1.5",
  },

  button: {
    marginTop: "30px",
    background: "#7f3aa1",
    color: "#fff",
    border: "none",
    padding: "14px 26px",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(127, 58, 161, 0.35)",
  },
};

export default RecruitInfo;