"use client";
import { useEffect, useState } from "react";
import { getAllRecipes } from "@/services/RecipeServices";
// import Image from "next/image";
import { RecipeData } from "@/types";

// // Type for the recipe data
// interface Recipe {
//     title: string;
//     description: string;
//     image: string;
// }

const RecipeList = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getAllRecipes();
                setRecipes(data); // Update the state with fetched data
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setError("Failed to fetch recipes");
                setLoading(false); // Set loading to false after error occurs
            }
        };

        fetchRecipes();
    }, []);

    if (loading) {
        return <div>Loading recipes...</div>; // Display a loading message while fetching
    }

    if (error) {
        return <div>{error}</div>; // Display an error message if fetching fails
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <div key={recipe.title} className="p-4 border rounded-lg shadow-md">
                    <h2 className="text-xl font-bold">{recipe.title}</h2>
                    <p className="text-gray-600">{recipe.description}</p>
                    {/* <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={300}
                        height={160}
                        className="w-full h-40 object-cover mt-2 rounded-md"
                    /> */}
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
