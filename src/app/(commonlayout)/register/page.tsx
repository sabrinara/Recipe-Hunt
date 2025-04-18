"use client";
import { registerUser } from "@/services/AuthServices";
import { UserData } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
// import GoogleLoginBtn from "../component/pages/shared/GoogleLoginBtn";
import { Input } from "@heroui/input";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import React from "react";
import { Button } from "@heroui/button";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  console.log(errors);
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [uploading, setUploading] = React.useState(false); 

  const toggleVisibility = () => setIsVisible(!isVisible);

  
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;

  const onSubmit = async (data: UserData) => {
    try {
      setUploading(true);

      // Upload image to ImgBB
      const formData = new FormData();
      const imageFile = data.imageUrl[0]; // Access file from file input
      formData.append("image", imageFile);
      formData.append("key", imgbbApiKey);

      const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const imgbbData = await imgbbResponse.json();

      if (!imgbbData.success) {
        throw new Error("Image upload failed.");
      }

      const imageUrl = imgbbData.data.url;

      // Include image URL in the user data
      const updatedData = {
        ...data,
        imageUrl,
      };

      // Send registration data to your server
      const res = await registerUser(updatedData);
      setUploading(false);

      if (res.success) {
        alert(res.message);
  
        // Store token and user in localStorage
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
  
        router.push("/");
      }
    } catch (error) {
      setUploading(false);
      
      console.log(error);
      alert("Error: " + error);
    }
  };



  return (
    <div>
      <div
        className="flex flex-col items-center justify-center md:h-screen bg-cover bg-center py-10 "
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/tTSVg8RC/best-diets-for-women-use-an-app-1580311871.jpg')",
        }}
      >

        <div className="w-full md:w-1/2 h-auto shadow-xl bg-red-50 dark:bg-black/80 bg-opacity-80 dark:bg-opacity-80 p-8 rounded-lg text-center ">
          <h1 className="text-center text-4xl mb-10 text-[#E10101] font-bold ">
            Register Now
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className=" py-3 font-semibold ">
            <div className="flex  items-center justify-center gap-4 ">
              <Input
                {...register("name")}
                label="Full Name"
                placeholder="Enter your name"
                labelPlacement="outside"
                variant="bordered"
                type="text"
                className="max-w-xs pb-2"
                required
              />
              <Input
                {...register("email")}
                type="email"
                labelPlacement="outside"
                label="Email"
                variant="bordered"
                placeholder="Enter your email"
                className="max-w-xs pb-2"
                required
              />
            </div>
            <div className="flex  items-center justify-center gap-4">
              <Input
                {...register("phone")}
                type="number"
                labelPlacement="outside"
                label="Phone"
                variant="bordered"
                placeholder="Enter your phone number"
                className="max-w-xs pb-2"
              />
              <Input
                {...register("address")}
                type="text"
                labelPlacement="outside"
                label="Address"
                variant="bordered"
                placeholder="Enter your address"
                className="max-w-xs pb-2"
              />
            </div>
            <div className="flex  items-center justify-center gap-4">
              <Input
                {...register("password")}
                label="Password"
                labelPlacement="outside"
                variant="bordered"
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
                className="max-w-xs pb-2"
              />

              <Input
                {...register("imageUrl")}
                label="Image"
                variant="bordered"
                labelPlacement="outside"
                type="file"
                className="max-w-xs pb-2 text-black"
                required
              />
            </div>
            <div className="form-control mt-6">
              <Button
                type="submit"
                className="bg-[#E10101]  hover:bg-white text-white hover:text-[#E10101] px-4 py-4 rounded-xl w-full text-lg font-bold"
                disabled={uploading}
              >
                {uploading ? "Submitting..." : "Register"}
              </Button>
            </div>
            {/* <GoogleLoginBtn /> */}
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-accent" href="/login">
                <span className="underline underline-offset-2 font-bold text-[#E10101] ">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
