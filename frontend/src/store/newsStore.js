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
    lastFetchedCategory: "",
    lastFetchedPage: 1,

    // Set selected category and reset to first page
    setCategory: (cat) => set({ category: cat, page: 1 }),

    // Set page for pagination
    setPage: (page) => set({ page }),

    // Fetch news from server
    fetchNews: async (force = false) => {
      const { category, page, news, lastFetchedCategory, lastFetchedPage } =
        get();

      // 🛑 Skip fetching only if same category AND page AND we have data
      if (
        !force &&
        category === lastFetchedCategory &&
        page === lastFetchedPage &&
        news.length > 0
      )
        return;

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
          lastFetchedCategory: category,
          lastFetchedPage: page
        });
      } catch (err) {
        set({ error: "Failed to fetch news." });
      } finally {
        set({ loading: false });
      }
    }
  }),
  {
    name: "news-store", // For persistence (if you enable middleware)
    partialize: (state) => ({
      category: state.category,
      page: state.page
    })
  }
);

export default useNewsStore;
