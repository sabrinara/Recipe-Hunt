"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { RecipeData } from "@/types";
import { getRecipeById } from "@/services/RecipeServices";
import { Avatar, Image } from "@heroui/react";

const ARecipe = () => {
    const { recipeId } = useParams();
    const router = useRouter();
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

    console.log("Recipe ID:", recipeId);
    console.log("Recipe Data:", recipe);



    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className=" p-6">
            <button onClick={() => router.push("/")} className="text-blue-500 underline mb-4">⬅ Back to Recipes</button>
            <h1 className="text-5xl font-bold">{recipe?.title}</h1>
            <div className="flex justify-start items-start gap-4 my-6">
                <Avatar
                    radius="full"
                    size="lg"
                    src={recipe?.user?.imageUrl}
                />
                <div className="flex flex-col justify-center items-start">
                    <h4> {recipe?.user?.name}</h4>
                    <p className="text-sm">{new Date(recipe?.createdAt?).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p>
                    {/* <p>{recipe?.user?.email}</p> */}
                </div>
            </div>
            <p className="text-gray-600 mt-2">{recipe?.description}</p>
            <Image
                src={recipe?.image?.[0] || "/fallback.jpg"}
                alt={recipe?.title}
                width={600}
                height={400}
                className="w-full h-40 object-cover mt-2 rounded-md"
                isZoomed
            />
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
