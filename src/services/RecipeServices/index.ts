"use server";

import { CreateRecipePayload, RecipeData } from "@/types";

export const getAllRecipes = async (): Promise<RecipeData[]> => {
    const response = await fetch(`${process.env.BACKEND_URL}/recipe`, {
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
    const recipes: RecipeData[] = data.data.recipes;
    // console.log("RecipeData", recipes);
    return recipes;
};


export const getRecipeById = async (id: string) => {

    console.log("Fetching recipe with ID:", id);

    const response = await fetch(`${process.env.BACKEND_URL}/recipe/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    if (!response.ok) {
        console.error("Error fetching recipe:", response.status, response.statusText);
        throw new Error("Recipe not found");
    }

    const data = await response.json();
    // console.log("Recipe Data:", data);
    return data.data;
};


export const createRecipe = async (data: CreateRecipePayload, token: string) => {
    if (!token) {
        throw new Error("No access token found. User might not be authenticated.");
    }

    const response = await fetch(`${process.env.BACKEND_URL}/recipe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Recipe creation failed:", errorData);
        throw new Error("Failed to create Recipe");
    }

    const recipeInfo = await response.json();
    console.log("Recipe created:", recipeInfo);
    return recipeInfo;
};


export const myRecipe = async (token: string) => {
   
        const response = await fetch(`${process.env.BACKEND_URL}/recipe/user/my-recipes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });


    if (!response.ok) {
        const errorData = await response.json();
        console.error("My Recipe fetch failed:", errorData);
        throw new Error("My Recipe fetch failed");
    }

    const myRecipe = await response.json();
    console.log("My All Recipe:", myRecipe.data.recipes);
    return myRecipe.data.recipes;
};


export const deleteRecipeById = async (_id: string, token: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/recipe/${_id}`, {
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


export const updateRecipeById = async (_id: string, updatedData: Partial<RecipeData>, token: string) => {
    const response = await fetch(`${process.env.BACKEND_URL}/recipe/${_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Recipe update failed:", errorData);
        throw new Error("Failed to update recipe");
    }

    const data = await response.json();

    console.log(data)
    return data.data;
};






