import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import style from "../styles/Profile.module.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    photoUrl: "",
    firstName: "",
    lastName: "",
    phone: "",
    position: "",
    about: "",
    skills: "",
    experience: "",
    resume: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const profileRef = doc(db, "users", currentUser.uid);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          setProfile((prev) => ({
            ...prev,
            ...profileSnap.data(),
          }));
        }
      } catch (error) {
        console.log("Ошибка при получении профиля:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Сначала войдите в аккаунт");
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, "users", user.uid),
        {
          ...profile,
          email: user.email,
          uid: user.uid,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Профиль сохранён");
    } catch (error) {
      console.log("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении профиля");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h2 className={style.loading}>Загрузка профиля...</h2>;
  }

  if (!user) {
    return <h2 className={style.loading}>Сначала войдите в аккаунт</h2>;
  }

  return (
    <div className={style.page}>
      <div className={style.card}>
        <div className={style.preview}>
          <div className={style.avatarBox}>
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="profile"
                className={style.avatar}
              />
            ) : (
              <span>Фото</span>
            )}
          </div>

          <h2>
            {profile.firstName || "Имя"} {profile.lastName || "Фамилия"}
          </h2>

          <p>{profile.position || "Желаемая должность"}</p>
        </div>

        <form className={style.form} onSubmit={handleSave}>
          <h1>Мой профиль</h1>

          <input
            type="text"
            name="photoUrl"
            placeholder="Ссылка на фото"
            value={profile.photoUrl}
            onChange={handleChange}
          />

          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={profile.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={profile.lastName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={profile.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="position"
            placeholder="Желаемая должность"
            value={profile.position}
            onChange={handleChange}
          />

          <textarea
            name="about"
            placeholder="О себе"
            value={profile.about}
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder="Навыки: React, JavaScript, HTML, CSS..."
            value={profile.skills}
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder="Опыт работы или учебные проекты"
            value={profile.experience}
            onChange={handleChange}
          />

          <textarea
            name="resume"
            placeholder="Резюме для отклика на вакансии"
            value={profile.resume}
            onChange={handleChange}
          />

          <button type="submit" disabled={saving}>
            {saving ? "Сохраняется..." : "Сохранить профиль"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;