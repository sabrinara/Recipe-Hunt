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
