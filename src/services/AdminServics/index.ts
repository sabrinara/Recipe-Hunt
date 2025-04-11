"use server";
import { AdminUpdateData } from "@/types";


export const makeAdmin  = async (userId:string,token:string, data: AdminUpdateData) => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Role update failed:", errorData);
        throw new Error("Failed to update role");
    }

    const updateRole = await response.json();

    console.log(updateRole)
    return updateRole;
};

