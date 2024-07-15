"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/app/lib/authentication.requests";
import { FieldValues, useForm } from "react-hook-form";
import { ILogin } from "@/app/utils/login";

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      const loginData: ILogin = {
        email: data.email,
        password: data.password,
      };

      const result = await login(loginData);

      if (result.err) {
        const errorMessage =
          result.status !== 500 ? "Invalid Email or Password" : "Server Error";
        setError("submit", { type: "custom", message: errorMessage });
      } else {
        localStorage.setItem("access", result.token);
        localStorage.setItem("refresh", result.refresh);

        router.push("/users");
      }
    } catch (error) {
      setError("submit", { type: "custom", message: "Server Error" });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, errors, register, handleSubmit };
};
