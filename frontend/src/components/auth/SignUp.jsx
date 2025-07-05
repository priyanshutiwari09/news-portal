import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Toaster import

const SignUp = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const res = await axios.post("http://localhost:5000/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      });

      toast.success("Signup successful!"); // ✅ Toast success
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed. Try again";
      setApiError(message);
      toast.error(message); // ✅ Toast error
    }

    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Enter Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Invalid name format"
                }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format"
                }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match"
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("remember")}
                className="mr-2"
              />
              <span className="text-sm">Remember me</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        {/* Optional inline API error */}
        {apiError && (
          <p className="text-sm text-red-500 text-center mt-4">{apiError}</p>
        )}

        {/* Social login and links */}
        <div className="mt-6 text-center">
          <p className="text-sm mb-2">
            Already a member?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <p className="text-sm mb-2">or sign up with:</p>
          <div className="flex justify-center gap-4 mt-2">
            <button className="text-blue-600 text-xl">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="text-blue-400 text-xl">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="text-red-500 text-xl">
              <i className="fab fa-google"></i>
            </button>
            <button className="text-gray-800 text-xl">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
