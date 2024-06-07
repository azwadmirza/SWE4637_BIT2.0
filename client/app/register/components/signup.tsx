"use client";
import { postSignUp } from "@/app/lib/requests";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";

const RegisterCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  register("submit");

  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:FieldValues) => {
    if (strength < 2) {
      setError("password", { type:"custom", message: "Password is weak" });
      return;
    }
    const confirmPassword=data.confirmPassword;
    const password=data.password;
    if(confirmPassword!==password){
        setError("confirmPassword", { type:"custom", message: "Passwords do not match" });
        return;
    }
    setLoading(true);
    await postSignUp({ username:data.username,email:data.email,password:data.password }).then((data) => {
      data.json().then((data) => {
        if (data.err) {
          if(data.status===500){
            setError("submit",{ type:"custom", message: "Server Error" });
          }
          else{
            setError("submit", { type:"custom", message: "Invalid Data Provided" });
          }
          setLoading(false);
        } else {
          localStorage.setItem("access", data.access);
          if (data.refresh) {
            localStorage.setItem("refresh", data.refresh);
          }
          localStorage.setItem("email", data.email);
          localStorage.setItem("username", data.username);
        }
        setLoading(false);
      });
    });
  };

  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-white bg-opacity-95 border-none">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-black">Register</h5>
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
            <div className="w-full text-red-800 py-2">
              {errors.username.message instanceof String?errors.username.message:"Server Error"}
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
            <div className="w-full text-red-800 py-2">
              {errors.email.message instanceof String?errors.email.message:"Server Error"}
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
            <div className="w-full text-red-800 py-2">
              {errors.password.message instanceof String?errors.password.message:"Server Error"}
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
            <div className="w-full text-red-800 py-2">
              {errors.confirmPassword.message instanceof String?errors.confirmPassword.message:"Server Error"}
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