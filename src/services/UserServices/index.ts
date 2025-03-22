"use server";

import { UserData } from "@/types";

export const getAllUsers = async (): Promise<UserData[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    const data = await response.json(); 
    const users: UserData[] = data.data.recipes; 
    console.log("UsersData",users);
    return users;
};
