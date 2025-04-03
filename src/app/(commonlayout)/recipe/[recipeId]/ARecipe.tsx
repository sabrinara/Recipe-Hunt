"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RecipeData } from "@/types";
import { getRecipeById } from "@/services/RecipeServices";
import { Avatar, Image } from "@heroui/react";
import LoadingPage from "../../component/pages/shared/LoadingPage";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
import { AiOutlineTags } from "react-icons/ai";
import { IoMdStar } from "react-icons/io";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";

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
    const toggleIngredient = (index: number) => {
        setRecipe((prevRecipe) => {
            if (!prevRecipe) return prevRecipe;

            const updatedIngredients = prevRecipe.ingredients.map((ingredient, i) =>
                i === index ? { ...ingredient, isChecked: !ingredient.isChecked } : ingredient
            );

            return { ...prevRecipe, ingredients: updatedIngredients };
        });
    };


    if (loading) return <div className="md:mb-80 md:ml-96"><LoadingPage /></div>;

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


            <div className="flex justify-center items-center gap-4 uppercase text-md font-semibold mt-6">
                {/* Cooking Time Section */}
                <div className="flex items-center gap-1">
                    <MdOutlineAccessTime className="text-[#E10101] text-xl font-extrabold" />
                    {recipe?.cookingTime !== undefined && recipe?.cookingTime !== null ? (
                        recipe.cookingTime < 60 ? (
                            <>{recipe.cookingTime} Minutes</>
                        ) : (
                            <>
                                {Math.floor(recipe.cookingTime / 60)} Hour
                                {Math.floor(recipe.cookingTime / 60) > 1 ? "s" : ""}{" "}
                                {recipe.cookingTime % 60 > 0 ? `${recipe.cookingTime % 60} Minutes` : ""}
                            </>
                        )
                    ) : (
                        <span>Not Available</span>
                    )}
                </div>
                <div className="flex items-center gap-1 " title="Difficulty">
                    <PiCookingPot className="text-[#E10101] text-xl" /> {recipe?.difficulty}
                </div>
                <div className="flex flex-wrap gap-2">
                    {recipe?.tags?.length ? (
                        recipe.tags.map((tag, index) => (
                            <span
                                key={index}
                                title="Tags"
                                className="flex justify-center items-center gap-1 px-3 py-1 uppercase font-semibold  text-md"
                            >
                                <AiOutlineTags className="text-[#E10101] text-lg mt-1" /> {tag}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-500">No tags available.</p>
                    )}
                </div>

            </div>
            <p className="text-gray-600 mt-2 text-lg font-medium">{recipe?.description || "No description available."}</p>
            <div className="flex items-center gap-1 mt-2">
                {recipe?.ratings?.length ? (
                    (() => {
                        const avgRating =
                            recipe.ratings.reduce((acc, rating) => acc + rating, 0) /
                            recipe.ratings.length;
                        const roundedRating = Math.round(avgRating);

                        return (
                            <>
                                {[...Array(roundedRating)].map((_, index) => (
                                    <IoMdStar key={index} className="text-[#E10101] text-2xl my-2 mx-1" />
                                ))}
                                <span className="text-lg font-medium font-serif"> {avgRating} from {avgRating + 1} Reviews.</span>
                            </>
                        );
                    })()
                ) : (
                    <p className="text-gray-500">No ratings available.</p>
                )}
            </div>



            <div className="flex items-center gap-4 mt-4">
                <h2 className="text-3xl font-semibold font-serif  whitespace-nowrap">
                    Ingredients
                </h2>
                <div className="flex-1 ">
                    <hr className="h-[2px] bg-gray-200 border-none" />
                    <hr className="h-[2px] mt-1 bg-gray-200 border-none" />
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:ml-20">
                {recipe?.ingredients?.length ? (
                    recipe.ingredients.map((ingredient, index) => (
                        <div
                            key={index}
                            className="flex  items-center gap-3 cursor-pointer"
                            onClick={() => toggleIngredient(index)}
                        >
                            {ingredient.isChecked ? (
                                <FaRegSquareCheck className="text-[#E10101] text-xl" />
                            ) : (
                                <FaRegSquare className="text-gray-500 text-xl" />
                            )}
                            <span
                                className={`text-lg ${ingredient.isChecked ? "line-through " : ""
                                    }`}
                            >
                                {ingredient.name} ———— {ingredient.quantity}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No ingredients available.</p>
                )}
            </div>
        </div>
    );
};

export default ARecipe;
