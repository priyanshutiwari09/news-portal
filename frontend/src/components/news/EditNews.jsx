import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthContext.jsx";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/news/${id}`);
        const { title, subTitle, content, imageUrl, category } = res.data;

        setValue("title", title);
        setValue("subTitle", subTitle);
        setValue("content", content);
        setValue("category", category);
        setPreviewImage(imageUrl);
      } catch (err) {
        console.error(err);
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, setValue]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_unsigned_preset"); // Replace with your Cloudinary unsigned preset

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your cloud name
      formData
    );

    return res.data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = previewImage;

      if (data.image[0]) {
        imageUrl = await handleImageUpload(data.image[0]);
      }

      await axios.put(
        `http://localhost:5000/news/${id}`,
        {
          title: data.title,
          subTitle: data.subTitle,
          content: data.content,
          category: data.category,
          imageUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* SubTitle */}
        <div>
          <label className="label">Sub Title</label>
          <input
            type="text"
            {...register("subTitle")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
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
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="label">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="textarea textarea-bordered w-full h-32"
          />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Change Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-bordered w-full"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-40 h-28 object-cover mt-2 rounded"
            />
          )}
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
