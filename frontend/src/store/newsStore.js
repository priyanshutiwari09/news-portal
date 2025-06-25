import { create } from "zustand";
import axios from "axios";

const useNewsStore = create((set, get) => ({
  news: [],
  loading: false,
  error: null,
  category: "", // ✅ NEW state

  setCategory: (cat) => set({ category: cat }),

  fetchNews: async () => {
    const { category } = get();
    set({ loading: true, error: null });

    try {
      const res = await axios.get(
        category
          ? `http://localhost:5000/news?category=${category}`
          : `http://localhost:5000/news`
      );
      set({ news: res.data });
    } catch (err) {
      set({ error: "Failed to fetch news." });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useNewsStore;
