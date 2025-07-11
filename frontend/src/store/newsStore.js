import { create } from "zustand";
import axios from "axios";

const useNewsStore = create((set, get) => ({
  news: [],
  loading: false,
  error: null,
  category: "",
  page: 1,
  totalPages: 1,

  // ✅ Set category and reset to first page
  setCategory: (cat) => set({ category: cat, page: 1 }),

  // ✅ Set page for pagination
  setPage: (page) => set({ page }),

  // ✅ Fetch news using page, limit and category
  fetchNews: async () => {
    const { category, page } = get();
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/news/all", {
        params: {
          category: category || undefined,
          page,
          limit: 10,
        },
      });

      set({
        news: res.data.news,
        totalPages: res.data.totalPages || 1,
      });
    } catch (err) {
      set({ error: "Failed to fetch news." });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useNewsStore;
