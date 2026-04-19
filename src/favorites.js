const KEY = "favorites";

// 🧠 безопасное получение данных (чтобы не ломалось приложение)
export const getFavorites = () => {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Favorites parse error:", error);
    return [];
  }
};

// ❤️ проверка
export const isFavorite = (id) => {
  const favorites = getFavorites();
  return favorites.some((item) => item.id === id);
};

// ➕ добавить
export const addToFavorites = (job) => {
  const favorites = getFavorites();

  const exists = favorites.some((item) => item.id === job.id);

  if (!exists) {
    const updated = [...favorites, job];
    localStorage.setItem(KEY, JSON.stringify(updated));
  }
};

// ❌ удалить
export const removeFromFavorites = (id) => {
  const favorites = getFavorites();

  const updated = favorites.filter((item) => item.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
};

// 🔁 toggle (главная функция)
export const toggleFavorite = (job) => {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === job.id);

  if (exists) {
    removeFromFavorites(job.id);
  } else {
    addToFavorites(job);
  }
};