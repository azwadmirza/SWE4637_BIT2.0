"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { register } from "@/app/lib/authentication.requests";
import { IRegister } from "@/app/utils/signup";

export const useRegister = () => {
  const {
    register:hookRegister,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  hookRegister("submit");
  const router = useRouter();

  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const checkPassword = (password: string, confirmPassword: string) => {
    if (strength < 2) {
      setError("password", { type: "custom", message: "Password is weak" });
      return false;
    }
    if (confirmPassword !== password) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords do not match",
      });
      return true;
    }
  };

  const onSubmit = async (data: FieldValues) => {
    if (checkPassword(data.password, data.confirmPassword)) {
      return;
    }
    setLoading(true);
    const { username, email, password } = data;
    const registerData: IRegister = {
      username,
      email,
      password,
    };
    try {
      const response = await register(registerData);
      const result = await response.json();

      if (result.err) {
        const errorMessage =
          result.status === 500 ? "Server Error" : "Invalid Data Provided";
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

  return {
    onSubmit,
    loading,
    errors,
    register:hookRegister,
    handleSubmit,
    watch,
    setStrength,
  };
};
