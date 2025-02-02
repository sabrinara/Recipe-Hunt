"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../component/pages/shared/GoogleLoginBtn";
import { loginUser } from "@/services/AuthServices";
import { Input } from "@nextui-org/input";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import React from "react";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  console.log(errors);
  const router = useRouter(); // for navigate 

  const onSubmit = async (data: FormValues) => {
    // console.log(data); 
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res.accessToken ) {
        alert(res.message);
        // localStorage.setItem("accessToken", res.accessToken);
        // localStorage.setItem("user",res.user);
        router.push("/"); //dedicated path for login
      }

    }  catch (error) {
      console.log(error);
      throw new Error("Failed to login");
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl mb-5">
        Login <span className="text-accent">Here</span>
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1710130697~exp=1710134297~hmac=f1b21d9c1823a0657d339c256a1c4ad8301168480e35b35aeba5106568a21010&w=740"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%]"
          />
        </div>

        <div className="card w-[70%] h-[80%] shadow-xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <Input
              {...register("password")}
              
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEyeSlash  className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div> */}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline">
                Login
              </button>
            </div>
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link className="text-accent" href="/register">
                Create an account
              </Link>
            </p>
          </form>
          <p className="text-center">Or Sign Up Using</p>
          <div className="flex justify-center mb-10 mt-2" >
            {/* <button className="btn btn-circle " onClick={() => signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })}>
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={50}
                height={50}
                alt="google logo"
              />
            </button> */}
            <GoogleLoginBtn />
            {/* <button className="btn btn-circle" onClick={() => signIn("github", { callbackUrl: "http://localhost:3000/dashboard" })}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={35}
                height={35}
                alt="github logo"
              />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;