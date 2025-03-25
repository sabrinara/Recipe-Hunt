"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { RecipeData } from "@/types";
import { getRecipeById } from "@/services/RecipeServices"; // Function to get a single recipe
import { Image } from "@heroui/react";

const ARecipe = () => {
    const { id } = useParams(); // Get recipe ID from URL
    const router = useRouter();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const recipeId = Array.isArray(id) ? id[0] : id; // Ensure it's always a string

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeById(recipeId);
                setRecipe(data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
                setError("Recipe not found");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRecipe();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => router.push("/")} className="text-blue-500 underline mb-4">⬅ Back to Recipes</button>

            <h1 className="text-3xl font-bold">{recipe?.title}</h1>
            <p className="text-gray-600 mt-2">{recipe?.description}</p>

            <Image 
                src={recipe?.image?.[0] || "/fallback.jpg"} 
                alt={recipe?.title || "Recipe Image"} 
                width={800} 
                height={500} 
                className="w-full h-auto rounded-md my-4" 
            />

            <h2 className="text-2xl font-semibold mt-4">Ingredients</h2>
            {/* <ul className="list-disc pl-6 text-gray-700">
                {recipe?.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul> */}

          

            <h2 className="text-2xl font-semibold mt-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {recipe?.tags?.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ARecipe;
