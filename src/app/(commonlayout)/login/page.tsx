"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import GoogleLoginBtn from "../component/pages/shared/GoogleLoginBtn";
import { loginUser } from "@/services/AuthServices";
import { Input } from "@heroui/input";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { toast } from "sonner";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [credentials, setCredentialsState] = useState<FormValues>({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: credentials,
  });

  console.log(errors)

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await loginUser(data);
      console.log(res.data);
      if (res.data.accessToken || res.data.token) {
        router.push('/');
        toast(res.message);
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast("Failed to Login. Check and login again");
      throw new Error("Failed to login");
    }
  };


  const setCredentials = (role: "user" | "admin") => {
    const userCredentials =
      role === "user"
        ? { email: "user@example.com", password: "user123" }
        : { email: "admin@gmail.com", password: "admin123" };

    setCredentialsState(userCredentials);
    setValue("email", userCredentials.email);
    setValue("password", userCredentials.password);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className="flex flex-col items-center justify-center md:h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/Z1f5YYnM/login.jpg')",
      }}
    >
      <div className="w-full md:w-1/2 h-auto shadow-xl bg-red-50 dark:bg-black/80 bg-opacity-80 dark:bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-center text-4xl mb-10 text-[#E10101] font-bold">
          Login <span className="text-accent">Now!</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="mt-4 flex justify-center items-center gap-2">
            <Button
              type="button"
              onClick={() => setCredentials("user")}
              className="border border-[#E10101] text-[#E10101] font-bold rounded-sm text-sm md:text-base"
              variant="bordered"
            >
              Login as User
            </Button>
            <Button
              type="button"
              onClick={() => setCredentials("admin")}
              className="border border-[#E10101] text-[#E10101] font-bold rounded-sm text-sm md:text-base"
              variant="bordered"
            >
              Login as Admin
            </Button>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-bold mb-3 text-lg">Email</span>
            </label>
            <Input
              {...register("email")}
              type="email"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your email"
              className="pb-2"
              required
              value={watch("email")} 
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text font-bold mb-3 text-lg">Password</span>
            </label>
            <Input
              variant="bordered"
              {...register("password")}
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              value={watch("password")}
            />
          </div>

          <div className="form-control mt-6 mb-2 text-center">
            <Button
              type="submit"
              className="bg-[#E10101] hover:bg-white text-white hover:text-[#E10101] px-4 py-4 rounded-xl w-full text-lg font-bold"
            >
              Login
            </Button>
          </div>

          {/* <div className="flex justify-center items-center mb-2">
            <GoogleLoginBtn />
          </div> */}

          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="text-accent underline underline-offset-2 font-bold text-[#E10101]"
              href="/register"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
