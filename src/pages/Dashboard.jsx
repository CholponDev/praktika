import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.name || "пользователь");
        } else {
          setUserName("пользователь");
        }
      } catch (error) {
        console.error("Ошибка получения имени:", error);
        setUserName("пользователь");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div>
      <h1>Добро пожаловать, {userName}!</h1>
      <p>Это ваш личный кабинет.</p>

      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Dashboard;