"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RecipeData } from "@/types";
import { getRecipeById } from "@/services/RecipeServices";
import { Avatar } from "@heroui/react";

const RecipeWriter = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const recipeIdData = Array.isArray(recipeId) ? recipeId[0] : recipeId;

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log("Fetching recipe with ID:", recipeId);
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
    }, [recipeId]);

    if (loading) return <div></div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mx-2 md:mx-0 my-10 flex justify-center">
            <div className="relative border border-gray-300 rounded-md p-6 w-full md:w-[420px] text-center shadow-md">
                {/* About Me Title with Border */}
                <div className="absolute bottom-[310px] md:bottom-[292px] left-28 right-28 z-10 bg-white dark:bg-[#141414]">
                    <h1 className="text-md  uppercase font-semibold  px-2 tracking-widest">
                        About Me
                    </h1>
                    
                </div>

                {/* User Avatar */}
                <div className="flex justify-center mt-4">
                    <Avatar
                        src={recipe?.user.imageUrl}
                        alt="User"
                        className="w-32 h-32 rounded-full border border-gray-300"
                    />
                </div>
                <p className=" dark:text-gray-300 mt-4 text-sm">
                    I create simple, delicious recipes that require 10 ingredients or less, 
                    one bowl, or {(recipe?.cookingTime ?? 0) > 30 ? "30 minutes or more" : "30 minutes or less "}
                    to prepare.
                </p>
                {/* Description */}
                

                {/* Signature */}
                <p className="mt-4 text-4xl italianno  dark:text-gray-500 font-signature">
                ———— {recipe?.user.name}
                </p>
            </div>
        </div>
    );
};

export default RecipeWriter;
