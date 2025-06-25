// components/NewsList.jsx
import { useEffect } from "react";
import useNewsStore from "../../store/newsStore.js"; // Zustand store
import NewsCard from "./NewsCard.jsx";


const NewsList = () => {
  const { news, fetchNews, loading, error } = useNewsStore();

  useEffect(() => {
    fetchNews();
    // console.log(fetchNews)
  }, [fetchNews]);

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="lg:flex lg:justify-center">
      <ul className="list bg-white rounded-box lg:w-[65vw] shadow-lg p-4">
        {news.map((item) => (
          <NewsCard key={item._id} news={item} />
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
