import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return (
    <div>
      <h1>Админ панель</h1>
      <p>Добро пожаловать, админ</p>

      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default AdminPage;