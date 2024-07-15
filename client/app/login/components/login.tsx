"use client";
import Loading from "@/app/loading";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import { tailwindError } from "@/app/utils/common-css";

const LoginCard = () => {
  const {onSubmit,loading,errors,register,handleSubmit}=useLogin();

  if(loading){
    Loading();
  }

  return (
    <div className="w-full max-w-sm p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-white bg-opacity-95 border-none">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-black">Login</h5>
        {errors.submit && (
            <div className={tailwindError}>
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
            <div className={tailwindError}>
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
          <div className={tailwindError}>
            {errors.password.message instanceof String?errors.password.message:"Invalid Email"}
          </div>
        )}
        </div>
        <button
          type="submit"
          className="w-full text-bitBrown bg-yellow-400 hover:border-bitBrown hover:bg-bitBrown hover:text-yellow-400 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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