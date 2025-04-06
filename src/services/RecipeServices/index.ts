"use server";

import { RecipeData } from "@/types";

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
    console.log("RecipeData", recipes);
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

