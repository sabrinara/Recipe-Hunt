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


export const deleteAUser = async (userId: string, token: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  
    if (!response.ok) {
      try {
        if (response.status !== 204) {
          const errorData = await response.json();
          console.error("User delete failed:", errorData);
        }
      } catch {
        console.error("User delete failed with no error body.");
      }
      throw new Error("Failed to delete User");
    }
  
    return true;
  };


  export const deleteRecipeAdmin = async (recipeId: string, token: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/recipe/admin/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  
    if (!response.ok) {
      try {
        if (response.status !== 204) {
          const errorData = await response.json();
          console.error("Recipe delete failed:", errorData);
        }
      } catch {
        console.error("Recipe delete failed with no error body.");
      }
      throw new Error("Failed to delete recipe");
    }
  
    return true;
  };
  
  export const recipePublished = async (recipeId: string, token: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/recipe/${recipeId}/publish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Publish failed:", errorData);
      throw new Error("Failed to publish recipe");
    }
  
    return await response.json();
  };
  
  export const recipeUnpublished = async (recipeId: string, token: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/recipe/${recipeId}/unpublish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Unpublish failed:", errorData);
      throw new Error("Failed to unpublish recipe");
    }
  
    return await response.json();
  };
  