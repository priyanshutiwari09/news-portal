import { useEffect } from "react";
import useNewsStore from "../../store/newsStore.js";
import NewsCard from "./NewsCard.jsx";
import Footer from "../layout/Footer.jsx";

const NewsList = () => {
  const { news, fetchNews, loading, error } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // ✅ Show loading screen only
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading news...</p>
      </div>
    );
  }

  // ✅ Show error if something failed
  if (error) {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }

  // ✅ After loading finished: check for empty news
  const noNews = news.length === 0;

  return (
    <>
      <div className="lg:flex lg:justify-center">
        <ul className="list bg-white rounded-box lg:w-[65vw] shadow-lg p-4 space-y-6">
          {noNews ? (
            <div className="text-center text-gray-500 py-16">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No news"
                className="w-32 h-32 mx-auto mb-4 opacity-70"
              />
              <p className="text-xl">🚫 No news found for this category.</p>
            </div>
          ) : (
            news.map((item) => <NewsCard key={item._id} news={item} />)
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default NewsList;
