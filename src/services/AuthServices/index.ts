"use server";

import { FormValues } from "@/app/(commonlayout)/login/page";
import { UserData } from "@/types";

export const registerUser = async (data: UserData) => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    const userInfo = await response.json();
    console.log("Data",userInfo)
    return userInfo;
};

export const loginUser = async (data: FormValues) => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const userInfo = await response.json();
    return userInfo;
};

export const getUserById = async (id: string) => {
    
    console.log("Fetching user with ID:", id);

    const response = await fetch(`${process.env.BACKEND_URL}/user/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    if (!response.ok) {
        console.error("Error fetching user:", response.status, response.statusText);
        throw new Error("User not found");
    }

    const data = await response.json();
    console.log("User Data:", data);
    return data.data;
};


// export const getAllUsers = async () => {
    
//     const response = await fetch(`${process.env.BACKEND_URL}/user/all`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//     });

//     if (!response.ok) {
//         console.error("Error fetching user:", response.status, response.statusText);
//         throw new Error("User not found");
//     }

//     const data = await response.json();
//     console.log("All User Data:", data);
//     return data.data;
// };
