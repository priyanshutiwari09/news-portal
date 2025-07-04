import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"; // ✅ Toaster import

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

  const imageFile = watch("image");
  const imageUrlInput = watch("imageUrl");

  useEffect(() => {
    if (imageFile?.[0]) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(imageFile[0]);
    } else if (imageUrlInput) {
      setPreviewImage(imageUrlInput);
    } else {
      setPreviewImage(null);
    }
  }, [imageFile, imageUrlInput]);

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subTitle", data.subtitle);
      formData.append("content", data.article);
      formData.append("category", data.category);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      } else if (data.imageUrl?.trim()) {
        formData.append("imageUrl", data.imageUrl.trim());
      }

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

      toast.success("News created successfully!"); // ✅ Toast success
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setApiError(message);
      toast.error(message); // ✅ Toast error
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
              className="input input-bordered w-full"
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
              className="textarea textarea-bordered w-full"
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
              className="textarea textarea-bordered w-full"
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
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Upload Image */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* OR Paste Image URL */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Or Paste Image URL
            </label>
            <input
              type="text"
              {...register("imageUrl")}
              className="input input-bordered w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Preview Image */}
          {previewImage && (
            <div className="mb-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-28 object-cover rounded"
              />
            </div>
          )}

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
