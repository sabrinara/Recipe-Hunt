"use server";


export const getAllUsers = async () => {
    
    const response = await fetch(`${process.env.BACKEND_URL}/user/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    if (!response.ok) {
        console.error("Error fetching user:", response.status, response.statusText);
        throw new Error("User not found");
    }

    const data = await response.json();
    console.log("All User Data:", data.data.users);
    return data.data.users;
};


