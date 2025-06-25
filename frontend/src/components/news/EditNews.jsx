import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext.jsx";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    content: "",
    imageUrl: "",
    category: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/news/${id}`);
        const { title, subTitle, content, imageUrl } = res.data;
        setFormData({ title, subTitle, content, imageUrl });
      } catch (err) {
        console.error(err);
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    // console.log(formData);
    console.log([e.target.name]);
    console.log(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/news/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/MyNews");
    } catch (err) {
      console.error(err);
      alert("Failed to update news.");
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* SubTitle */}
        <div>
          <label className="label">Sub Title</label>
          <input
            type="text"
            name="subTitle"
            className="input input-bordered w-full"
            value={formData.subTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Sports">Sports</option>
            <option value="Politics">Politics</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Technology">Technology</option>
            <option value="Crime">Crime</option>
            <option value="Finance">Finance</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="label">Content</label>
          <textarea
            name="content"
            className="textarea textarea-bordered w-full h-32"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="input input-bordered w-full"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update News
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
