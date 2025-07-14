import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useNewsStore = create(
  persist(
    (set, get) => ({
      news: [],
      loading: false,
      error: null,
      category: "",
      page: 1,
      totalPages: 1,
      lastFetchedCategory: "",
      lastFetchedPage: 1,

      setCategory: (cat) => set({ category: cat, page: 1 }),
      setPage: (page) => set({ page }),

      fetchNews: async (force = false) => {
        const { category, page, news, lastFetchedCategory, lastFetchedPage } =
          get();

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
      name: "news-store",
      partialize: (state) => ({
        category: state.category,
        page: state.page,
        news: state.news,
        lastFetchedCategory: state.lastFetchedCategory,
        lastFetchedPage: state.lastFetchedPage
      })
    }
  )
);

export default useNewsStore;
