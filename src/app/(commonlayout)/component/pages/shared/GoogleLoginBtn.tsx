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
      className="bg-transparent hover:border-2 hover:border-[#E10101] hover:bg-white dark:hover:text-[#E10101] rounded-none mt-4 font-semibold" 
    >
      <FcGoogle className="text-3xl"/>
      Log In With Google
    </Button>
  );
};

export default GoogleLoginBtn;