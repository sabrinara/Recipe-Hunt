"use client";

import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginBtn = ( ) => {
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  return (
    <Button
      onClick={() => {
        signIn("google", { callbackUrl: redirect ? redirect : "/" });
      }}
      className="bg-transparent hover:border-2 hover:border-red-500 hover:bg-white dark:hover:text-red-700 rounded-none mt-4 font-semibold" 
    >
      <FcGoogle className="text-3xl"/>
      Log In With Google
    </Button>
  );
};

export default GoogleLoginBtn;