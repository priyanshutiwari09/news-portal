// src/components/auth/ResetPassword.jsx
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`http://localhost:5000/user/reset-password/${token}`, {
        password: data.password
      });
      toast.success("Password reset successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 border rounded"
            {...register("password", {
              required: "Password required",
              minLength: 5
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
            type="submit"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
