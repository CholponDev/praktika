import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import Header from "./component/Header";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./component/Home";
import Login from "./pages/Login";
import RoleProtectedRoute from "./component/RoleProtectedRoute";
import AdminPage from "./pages/AdminPage";
import FindJob from "./pages/FindJob";
import PostJob from "./pages/PostJob";
import RecruitInfo from "./pages/RecruitInfo";

import Resumes from "./pages/Resumes";
import Applications from "./pages/Applications";
import Favorites from "./pages/Favorites";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import Instructions from "./pages/Instructions";
import Addresume from "./pages/Addresume";

function AnimatedRoutes({ city, jobs, addJob, lang }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home lang={lang} />} />

        <Route path="/register" element={<Register lang={lang} />} />
        <Route path="/login" element={<Login lang={lang} />} />

        <Route
          path="/jobs"
          element={<FindJob city={city} jobs={jobs} lang={lang} />}
        />

        <Route
          path="/post-job"
          element={<PostJob addJob={addJob} lang={lang} />}
        />

        <Route path="/recruit-info" element={<RecruitInfo lang={lang} />} />
        <Route path="/profile" element={<Profile lang={lang} />} />

        {/* Эти страницы можно открыть из Header */}
        <Route path="/resumes" element={<Resumes lang={lang} />} />
        <Route path="/instructions" element={<Instructions lang={lang} />} />

        {/* USER DASHBOARD */}
        <Route element={<RoleProtectedRoute allowedRole="user" />}>
          <Route path="/dashboard" element={<Dashboard lang={lang} />} />
          <Route path="/post-resume" element={<Addresume lang={lang} />} />
          <Route path="/applications" element={<Applications lang={lang} />} />
          <Route path="/favorites" element={<Favorites lang={lang} />} />
          <Route path="/stats" element={<Stats lang={lang} />} />
        </Route>

        {/* ADMIN */}
        <Route element={<RoleProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminPage lang={lang} />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [city, setCity] = useState("all");

  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "ru";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addJob = (job) => {
    setJobs((prev) => {
      const updated = [...prev, job];
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <Header
        city={city}
        setCity={setCity}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="main">
        <AnimatedRoutes
          city={city}
          jobs={jobs}
          addJob={addJob}
          lang={lang}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;