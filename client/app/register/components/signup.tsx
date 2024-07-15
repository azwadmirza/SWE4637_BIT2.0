"use client";
import Link from "next/link";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRegister } from "../hooks/useRegister";
import Loading from "@/app/loading";
import { tailwindError } from "@/app/utils/common-css";

const RegisterCard = () => {
  const { onSubmit, loading, errors, register, handleSubmit, watch, setStrength } = useRegister();
  if (loading) {
    return Loading();
  }
  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-white bg-opacity-95 border-none">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-black">Register</h5>
        {errors.submit && (
          <div className={tailwindError}>
            {errors.submit.message instanceof String ? errors.submit.message : "Server Error"}
          </div>
        )}
        <div>
          <label className="block mb-2 text-sm font-medium text-black text-black">
            Your username
          </label>
          <input
            type="username"
            placeholder={"someone"}
            {...register("username", { required: "Username is required" })}
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          />
          {errors.username && (
            <div className={tailwindError}>
              Username must be present
            </div>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-black text-black">
            Your email
          </label>
          <input
            type="email"
            placeholder={"someone@example.com"}
            {...register("email", { required: "Email Address is required" })}
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          />
          {errors.email && (
            <div className={tailwindError}>
              Invalid Email
            </div>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-black text-black">
            Your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          />
          {errors.password && (
            <div className={tailwindError}>
              Password should be of more than 8 characters, with at least one uppercase letter, one lowercase letter, one number and one special character
            </div>
          )}
          <PasswordStrengthBar
            password={watch("password")}
            onChangeScore={(score, feedback) => setStrength(score)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-black text-black">
            Confirm your password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Password Confirmation is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          />
          {errors.confirmPassword && (
            <div className={tailwindError}>
              Passwords Do Not Match
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:border-blue-700 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register
        </button>
        <div className="text-sm font-medium text-black dark:text-black">
          Already Have an Account?{" "}
          <Link href={"/login"}>
            <button className="text-blue-700 hover:underline dark:text-blue-500">
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;