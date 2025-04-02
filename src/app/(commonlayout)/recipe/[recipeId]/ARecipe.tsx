"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RecipeData } from "@/types";
import { getRecipeById } from "@/services/RecipeServices";
import { Avatar, Image } from "@heroui/react";

const ARecipe = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const recipeIdData = recipeId ? (Array.isArray(recipeId) ? recipeId[0] : recipeId) : null;

    useEffect(() => {
        if (!recipeIdData) return; // Prevent fetching if recipeIdData is null

        const fetchRecipe = async () => {
            try {
                console.log("Fetching recipe with ID:", recipeIdData);
                const data = await getRecipeById(recipeIdData);
                setRecipe(data.recipe);
            } catch (error) {
                console.error("Error fetching recipe:", error);
                setError("Recipe not found");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeIdData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6">

            <h1 className="text-5xl font-bold">{recipe?.title}</h1>

            <div className="flex justify-start items-start gap-4 my-6">
                <Avatar radius="full" className="w-16 h-16" src={recipe?.user?.imageUrl || "/fallback-avatar.jpg"} />
                <div className="flex flex-col justify-center items-start  mt-1">
                    <h4 className="text-xl font-semibold">{recipe?.user?.name}</h4>
                    <p className="text-md ">
                        {recipe?.createdAt ? new Date(recipe.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }) : "Unknown Date"}
                    </p>
                </div>
            </div>
            <Image
                src={recipe?.image?.[0] || "/fallback.jpg"}
                alt={recipe?.title || "Recipe Image"}
                
                className="w-[200vh] h-[100vh] object-cover mt-2"
                isZoomed
            />
            <p className="text-gray-600 mt-2 text-lg font-medium">{recipe?.description || "No description available."}</p>



            <h2 className="text-2xl font-semibold mt-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
                {recipe?.tags?.length ? (
                    recipe.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                            #{tag}
                        </span>
                    ))
                ) : (
                    <p className="text-gray-500">No tags available.</p>
                )}
            </div>
        </div>
    );
};

export default ARecipe;
