import { create } from "zustand";
import axios from "axios";

const useNewsStore = create(
  (set, get) => ({
    news: [],
    loading: false,
    error: null,
    category: "",
    page: 1,
    totalPages: 1,
    lastFetchedCategory: "", // ✅ added

    setCategory: (cat) => set({ category: cat, page: 1 }),

    setPage: (page) => set({ page }),

    fetchNews: async (force = false) => {
      const { category, page, news, lastFetchedCategory } = get();

      // ✅ Only skip fetch if same category and news exists
      if (!force && category === lastFetchedCategory && news.length > 0) return;

      set({ loading: true, error: null });

      try {
        const res = await axios.get("/api/news/all", {
          params: {
            category: category || undefined,
            page,
            limit: 10
          }
        });

        set({
          news: res.data.news,
          totalPages: res.data.totalPages || 1,
          lastFetchedCategory: category // ✅ update tracker
        });
      } catch (err) {
        set({ error: "Failed to fetch news." });
      } finally {
        set({ loading: false });
      }
    }
  }),
  {
    name: "news-store",
    partialize: (state) => ({
      category: state.category,
      page: state.page
    })
  }
);

export default useNewsStore;
