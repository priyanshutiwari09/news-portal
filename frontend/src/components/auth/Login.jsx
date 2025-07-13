import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import toast from "react-hot-toast"; // ✅ Toaster import

const Login = () => {
  const { login } = useAuth();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await axios.post("/user/login", {
        email: data.email,
        password: data.password
      });

      login(res.data.token, res.data.user);
      toast.success("Login successful!"); // ✅ Toast success
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again.";
      setApiError(message);
      toast.error(message); // ✅ Toast error
    }
  };

  return (
    <div className="flex text-black items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <div className="relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-0 left-0 mt- ml- text-gray-600 hover:text-red-600 hover:cursor-pointer text-xl font-bold focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              <p className="text-sm text-red-500 mt-1">
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
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                {...register("remember")}
              />
              <span className="text-sm">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
          >
            Sign in
          </button>
        </form>

        {/* Optional inline API error */}
        {apiError && (
          <p className="text-sm text-red-500 text-center mt-4">{apiError}</p>
        )}

        {/* Social login */}
        <div className="mt-6 text-center">
          <p className="text-sm mb-2">
            Not a member?{" "}
            <Link to="/SignUp" className="text-blue-600 hover:underline">
              Register
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

export default Login;
