/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ profile, account }) {
      try {
        if (!profile || !account) {
          console.error("Missing profile or account information");
          return false;
        }

        if (account.provider === "google") {
          const userData = {
            name: profile.name || "Unknown User",
            email: profile.email,
            imageUrl: (profile as any).picture || null,
            phone: "",
            address: "",
            role: "user",
            password: "GoogleAuth123",
          };

          // Fetch all users to check if the email already exists
          const usersResponse = await fetch(
             `${process.env.BACKEND_URL}/user/all`
          );

          if (!usersResponse.ok) {
            console.error("Failed to fetch users:", await usersResponse.json());
            return false;
          }

          const usersData = await usersResponse.json();
          console.log("Users API Response:", usersData);

          const users = usersData.data?.users || []; 
          const existingUser = users.find((user: any) => user.email === profile.email);

          let response;

          if (existingUser) {
            // User exists -> Log in instead of signing up
            response = await fetch(
              `${process.env.BACKEND_URL}/user/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: profile.email, password: "GoogleAuth123" }),
              }
            );
          } else {
            // User does not exist -> Sign up
            response = await fetch(
              `${process.env.BACKEND_URL}/user/signup`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
              }
            );
          }

          if (!response.ok) {
            console.error("Failed to authenticate user:", await response.json());
            return false;
          }

          const data = await response.json();
          console.log("User authenticated successfully:", data);

          // // ✅ Save token and user info in localStorage
          // if (typeof window !== "undefined") {
          //   localStorage.setItem("accessToken", data.data.token); // Save token
          //   localStorage.setItem("user", JSON.stringify(data.data.user)); // Save user info
          // }

          return data.data;
        }

        return false;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET as string,
};
