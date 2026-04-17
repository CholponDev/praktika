import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function RoleProtectedRoute({ allowedRole }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setRole("");
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setRole(userData.role);
        } else {
          setRole("");
        }
      } catch (error) {
        console.error("Ошибка при получении роли:", error);
        setRole("");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  // Если не вошёл в аккаунт
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Если роль не подходит
  if (role !== allowedRole) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (role === "user") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;