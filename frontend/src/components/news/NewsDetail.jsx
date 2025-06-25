import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/news/${id}`);
        setNews(res.data);
        // console.log(res.data);
      } catch (err) {
        setError("Failed to load news item.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!news) return null;

  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white p-6 space-y-6 rounded shadow">
        {/* Headline */}
        <h1 className="text-4xl font-semibold text-gray-800">{news.title}</h1>

        {/* Meta Row */}
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <p>
              By{" "}
              <span className="font-medium text-gray-800">
                {news.createdBy.name || "Unknown"}
              </span>
            </p>
            <p>
              Updated on:{" "}
              {new Date(news.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZoneName: "short"
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:underline">Share</button>
            <button className="text-blue-600 hover:underline">Bookmark</button>
          </div>
        </div>

        {/* Image */}
        {news.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={news.imageUrl}
              alt="News"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
          {news.content}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
