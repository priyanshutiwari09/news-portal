import { useEffect } from "react";
import useNewsStore from "../../store/newsStore.js";
import NewsCard from "./NewsCard.jsx";
import Footer from "../layout/Footer.jsx";

const NewsList = () => {
  const { news, fetchNews, loading, error } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // if (loading) {
  //   return <p className="text-center py-8 text-gray-500">Loading news...</p>;
  // }

  if (error) {
    return <p className="text-center text-red-500 py-8">{error}</p>;
  }

  return (
    <>
      <div className="lg:flex lg:justify-center">
        <ul className="list bg-white rounded-box lg:w-[65vw] shadow-lg p-4 space-y-6">
          {news.map((item) => (
            <NewsCard key={item._id} news={item} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default NewsList;
