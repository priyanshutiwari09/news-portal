import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyNews = () => {
  const { token } = useAuth();
  const [myNews, setMyNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyNews = async () => {
      try {
        const res = await axios.get("/api/news/admin/my-articles", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMyNews(res.data);
      } catch (err) {
        console.error("Error fetching my news:", err);
        setError("Failed to fetch your news.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMyNews();
    }
  }, [token]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`/api/news/article/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyNews((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting news:", err);
      alert("Failed to delete news.");
    }
  };

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="lg:flex lg:justify-center">
      <ul className="list bg-white rounded-box lg:w-[65vw] shadow-lg p-4 space-y-4">
        {myNews.map((news) => (
          <li
            key={news._id}
            // list-rows
            className="border-b border-gray-300 pb-5 hover:bg-gray-100 transition rounded-lg"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              {/* Content Section */}
              <Link
                to={`/news/${news._id}`}
                className="flex-1 no-underline text-inherit"
              >
                <h2 className="text-xl font-bold text-gray-900">
                  {news.title}
                </h2>
                <p className="text-sm mt-2 text-gray-800">
                  {news.subTitle ||
                    new Date(news.createdAt).toLocaleDateString()}
                </p>
              </Link>

              {/* Image Section */}
              {news.imageUrl && (
                <div className="w-full lg:w-80 ml-auto flex-shrink-0">
                  <div className="aspect-video overflow-hidden rounded">
                    <img
                      src={news.imageUrl}
                      alt="News"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex gap-1">
              <button
                onClick={() => navigate(`/edit/${news._id}`)}
                className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-100"
              >
                <FaEdit className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(news._id)}
                className="btn btn-sm btn-ghost text-red-600 hover:bg-red-100"
              >
                <FaTrash className="mr-1" />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyNews;
