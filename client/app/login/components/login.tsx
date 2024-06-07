"use client";
import { postLogin } from "@/app/lib/requests";
import Loading from "@/app/loading";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const LoginCard = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loading,setLoading]=useState(false);
  register("submit");

  const onSubmit = async(data:FieldValues) => {
        await postLogin({email:data.email,password:data.password}).then((data) => {
            data.json().then((data) => {
                if(data.err){
                    if(data.status!==500){
                        setError("submit",{ type:"custom", message: "Invalid Email or Password" });
                    }
                    else{
                        setError("submit",{ type:"custom", message: "Server Error" });
                    }
                    setLoading(false);
                }
                else{
                    localStorage.setItem('access',data.access);
                    if(data.refresh){
                        localStorage.setItem('refresh',data.refresh);
                    }
                    localStorage.setItem('email',data.email);
                    localStorage.setItem('username',data.username);
                }
                setLoading(false);
            })
        });
  };

  if(loading){
    Loading();
  }

  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-white bg-opacity-95 border-none">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-black">Login</h5>
        {errors.submit && (
            <div className="w-full py-2 text-red-800">
                {errors.submit.message instanceof String?errors.submit.message:"Server Error"}
            </div>
        )}
        <div>
          <label className="block mb-2 text-sm font-medium text-black text-black">
            Your email
          </label>
          <input
            type="email"
            defaultValue={"someone@example.com"}
            {...register("email",{ required: "Email Address is required" })}
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          />
          {errors.email && (
            <div className="w-full py-2 text-red-800">
              {errors.email.message instanceof String?errors.email.message:"Invalid Email"}
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
            {...register("password",{ required: "Password is required" })}
            className="bg-gray-50 border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          />
          {errors.password && (
          <div className="w-full py-2 text-red-800">
            {errors.password.message instanceof String?errors.password.message:"Invalid Email"}
          </div>
        )}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:border-blue-700 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login to your account
        </button>
        <div className="text-sm font-medium text-black dark:text-black">
          Not registered?{" "}
          <Link href={"/register"}>
          <button className="text-blue-700 hover:underline dark:text-blue-500">
            Create account
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;