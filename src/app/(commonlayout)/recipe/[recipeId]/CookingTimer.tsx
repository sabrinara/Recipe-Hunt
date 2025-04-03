"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RecipeData } from "@/types";
import { getRecipeById } from "@/services/RecipeServices";
import { FaStop } from "react-icons/fa";
import { CgPlayPause } from "react-icons/cg";
import { BsFillPlayFill } from "react-icons/bs";


const CookingTimer = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const recipeIdData = Array.isArray(recipeId) ? recipeId[0] : recipeId;

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                console.log("Fetching recipe with ID:", recipeId);
                const data = await getRecipeById(recipeIdData);
                setRecipe(data.recipe);

                // Set initial timer value (convert minutes to seconds)
                if (data.recipe?.cookingTime) {
                    setTimeLeft(data.recipe.cookingTime * 60);
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
                setError("Recipe not found");
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [recipeId]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null; 
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            if (timer) {
                clearInterval(timer);
            }
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isRunning, timeLeft]);

    // Format time in MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleStop = () => {
        setIsRunning(false);
        setTimeLeft(recipe?.cookingTime ? recipe.cookingTime * 60 : 0);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex justify-center my-4 mx-2 md:mx-0  md:my-20">

<div className="relative border border-gray-300 rounded-md p-6 w-full md:w-96 text-center shadow-md">
                {/* About Me Title with Border */}
                <div className="absolute bottom-[300px] left-20 right-20 z-10 bg-white dark:bg-[#141414]">
                    <h1 className="text-md  uppercase font-semibold  px-2 tracking-widest">
                        Track Cooking Time
                    </h1>
                    
                </div>
              <div className="flex flex-col justify-center items-center mt-6">
              <div className="flex justify-center items-center w-48 h-48 rounded-full border-4 border-gray-300 dark:border-gray-600  p-4">
                    <div className="flex justify-center items-center w-full h-full text-4xl font-mono dark:text-gray-400">
                        {formatTime(timeLeft)}
                    </div>
                </div>
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={handleStart}
                        className="text-green-600"
                        title="Start Timer"
                    >
                       <BsFillPlayFill className="text-2xl"/>
                    </button>
                    <button
                        onClick={handlePause}
                        className="text-blue-500 "
                          title="Pause Timer"
                    >
                        <CgPlayPause className="text-3xl" />
                    </button>
                    <button
                        onClick={handleStop}
                        className="text-[#E10101]"
                          title="Stop Timer"
                    >
                        <FaStop />
                    </button>
                </div>
              </div>
            </div>

        </div>

    );
};

export default CookingTimer;
