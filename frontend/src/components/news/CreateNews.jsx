import { useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateNews = () => {
  const { token } = useAuth();
  const [apiError, setApiError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // 👀 Watch image input and update preview
  const imageFile = watch("image");
  if (imageFile?.[0] && !previewImage) {
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewImage(fileReader.result);
    fileReader.readAsDataURL(imageFile[0]);
  }

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subTitle", data.subtitle);
      formData.append("content", data.article);
      formData.append("category", data.category);
      formData.append("image", data.image[0]);

      const res = await axios.post(
        "http://localhost:5000/news/createNews",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      navigate("/");
      console.log(res.data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.log("Error creating news:", message);
      setApiError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter News Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Title"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Title</label>
            <textarea
              rows={2}
              {...register("subtitle", { required: "Sub Title is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Sub Title"
            ></textarea>
            {errors.subtitle && (
              <p className="text-sm text-red-500 mt-1">
                {errors.subtitle.message}
              </p>
            )}
          </div>

          {/* Article */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              News Article
            </label>
            <textarea
              rows={6}
              {...register("article", { required: "News Article is required" })}
              className="w-full px-4 py-2 border rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter News Article"
            ></textarea>
            {errors.article && (
              <p className="text-sm text-red-500 mt-1">
                {errors.article.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              News Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a category</option>
              <option value="Sports">Sports</option>
              <option value="Politics">Politics</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Technology">Technology</option>
              <option value="Crime">Crime</option>
              <option value="Finance">Finance</option>
              <option value="Food">Food</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image Upload with Preview */}
          <div className="mb-4">
            <label className="label">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-sm text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-28 object-cover mt-2 rounded"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>

          {apiError && (
            <p className="text-red-500 text-sm text-center mt-4">{apiError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
