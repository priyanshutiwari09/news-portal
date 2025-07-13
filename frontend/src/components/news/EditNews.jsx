import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthContext.jsx";
import toast from "react-hot-toast"; // ✅ Import toast

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
        const res = await axios.get(`/news/article/${id}`);
        const { title, subTitle, content, imageUrl, category } = res.data;

        setValue("title", title);
        setValue("subTitle", subTitle);
        setValue("content", content);
        setValue("category", category);
        setValue("imageUrl", imageUrl);
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subTitle", data.subTitle);
      formData.append("category", data.category);
      formData.append("content", data.content);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      } else if (data.imageUrl && data.imageUrl.trim()) {
        formData.append("imageUrl", data.imageUrl.trim());
      }

      await axios.put(`/api/news/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("News updated successfully!"); // ✅ toast on success
      navigate("/MyNews");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update news.";
      toast.error(message); // ✅ toast on error
      console.error(err);
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input  bg-gray-300 input-bordered w-full"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">Sub Title</label>
          <input
            type="text"
            {...register("subTitle")}
            className="input  bg-gray-300 input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select  bg-gray-300 select-bordered w-full"
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

        <div>
          <label className="label">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="textarea  bg-gray-300 textarea-bordered w-full h-32"
          />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="label">Change Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input  bg-gray-300 file-input-bordered w-full"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        <div>
          <label className="label">Or paste Image URL</label>
          <input
            type="text"
            {...register("imageUrl")}
            placeholder="https://example.com/image.jpg"
            className="input  bg-gray-300 input-bordered w-full"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </div>

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-40  h-28 object-cover mt-2 rounded"
          />
        )}

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
