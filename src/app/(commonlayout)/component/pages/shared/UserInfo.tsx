"use client";
import { useEffect } from "react";
// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const UserInfo =()=> {
  const { data: session }= getServerSession();
  console.log(session);

  useEffect(() => {
    if (session?.user) {
      const { token, user } = session.user;

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Saved to localStorage:", { token, user });
      }
    }
  }, [session]);

  return <div>Your app content</div>;
}

export default UserInfo;
