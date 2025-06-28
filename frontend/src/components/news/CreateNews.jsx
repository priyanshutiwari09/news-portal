import { useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const CreateNews = () => {
  const { token } = useAuth();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  //   const onSubmit = async (data) => {
  //     setApiError("");
  //     try {
  //       const res = await axios.post("http://localhost:5000/user/login", {
  //         email: data.email,
  //         password: data.password
  //       });
  //       login(res.data.token, res.data.user);
  //       navigate("/");
  //     } catch (err) {
  //       const message = err.response?.data?.message || "Login failed. Try again.";
  //       setApiError(message);
  //     }
  //     // handle login here (e.g. API call)
  //   };

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/news/createNews",
        {
          title: data.title,
          subTitle: data.subtitle,
          content: data.article,
          imageUrl: data.image,
          category: data.category,
          article: data.article
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate("/");

      console.log(res.data);
    } catch (error) {
      console.log("Error creating news:", error.response?.dat || error.message);
      setApiError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Enter News Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required"
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Title"
            />
            {errors.text && (
              <p className="text-sm text-red-500 mt-1">{errors.text.message}</p>
            )}
          </div>
          {/* subtitle */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Sub Title</label>
            <textarea
            rows={2}
              type="text"
              {...register("subtitle", {
                required: "Sub Title is required"
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Sub Title"
            ></textarea>
            {errors.text && (
              <p className="text-sm text-red-500 mt-1">{errors.text.message}</p>
            )}
          </div>
          {/* news article */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              News Article
            </label>
            <textarea
              rows={6}
              {...register("article", {
                required: "News Article is required"
              })}
              className="w-full px-4 py-2 border rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter News Article"
            ></textarea>
            {errors.article && (
              <p className="text-sm text-red-500 mt-1">
                {errors.article.message}
              </p>
            )}
          </div>

          {/* category */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              News Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a category</option>
              <option value="Politics">Sports</option>
              <option value="Technology">Politics</option>
              <option value="Sports">Entertainment</option>
              <option value="Entertainment">Technology</option>
              <option value="Health">Crime</option>
              <option value="Education">Finance</option>
              <option value="Education">Food</option>
            </select>

            {errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Image</label>
            <input
              type="text"
              {...register("image", {
                required: "Image is required"
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter News Image"
            />
            {errors.text && (
              <p className="text-sm text-red-500 mt-1">{errors.text.message}</p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
