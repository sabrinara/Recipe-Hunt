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
          // Format data to match backend requirements
          const userData = {
            name: profile.name || "Unknown User",
            email: profile.email,
            imageUrl: profile.picture || null,
            phone: "", // Default empty value
            address: "", // Default empty value
            role: "user", // Default role
            password: "GoogleAuth123", // Placeholder password
          };

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );

          if (!response.ok) {
            // Log detailed response for debugging
            const errorDetails = await response.json();
            console.error("Failed to register user:", errorDetails);
            return false;
          }

          const data = await response.json();
          console.log("User registered successfully:", data);

        const token = data.data.token;
        console.log("Token",token);

        const user = data.data.user;
        console.log(user);

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
