"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { RecipeData } from "@/types";
import { getAllRecipes } from "@/services/RecipeServices";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { Avatar } from "@heroui/react";

const SomeRecipe = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getAllRecipes();
                setRecipes(recipeData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    const chunkArray = (arr: RecipeData[], size: number) => {
        const result: RecipeData[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };


    const recipeChunks = chunkArray(recipes, 3);

    return (
        <div className="embla relative my-10">
            <div className="embla__viewport mt-12 h-80 md:h-[70vh] w-full rounded-t-xl" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {recipeChunks.map((chunk, index) => (
                        <div className="embla__slide flex w-full items-center justify-around rounded-xl gap-3" key={index}>
                            {chunk.map((recipe, recipeIndex) => {

                                return (
                                    <div
                                        key={recipeIndex}
                                        className="relative w-1/3 h-[80vh] md:h-[70vh] rounded-xl overflow-hidden group shadow-lg"
                                        style={{
                                            backgroundImage: `url(${recipe.image[0]})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    >
                                        <div className="absolute bottom-[10px] mx-4 left-0  bg-white/80 text-black px-5 py-4 transition-all duration-500 h-[90px] group-hover:h-[250px] group-hover:bg-white">
                                            <div className="flex justify-between items-center uppercase text-lg font-semibold">
                                                <div className="flex items-center gap-1">
                                                    <MdOutlineAccessTime />
                                                    {recipe.cookingTime < 60
                                                        ? <>{recipe.cookingTime} Minutes</>
                                                        : <>
                                                            {Math.floor(recipe.cookingTime / 60)} Hour{Math.floor(recipe.cookingTime / 60) > 1 ? "s" : ""}{" "}
                                                            {recipe.cookingTime % 60 > 0 ? `${recipe.cookingTime % 60} Minutes` : ""}
                                                        </>
                                                    }
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <PiCookingPot /> {recipe.difficulty}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-semibold">{recipe.name}</h3>
                                            <p className="mt-1 text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                                {recipe.description.slice(0, 200)}...
                                            </p>




                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex  items-center justify-center gap-2 ">
                                                    <div className="">
                                                        <Avatar
                                                            radius="full"
                                                            size="lg"
                                                            src={recipe.user?.imageUrl}
                                                        />
                                                      
                                                    </div>

                                                    <div className="flex flex-col justify-between font-medium font-serif">
                                                        <h4> {recipe.user?.name}</h4>
                                                        {/* <p>{recipe.user?.email}</p> */}
                                                        <p className="text-sm">{new Date(recipe?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                                                    </div>

                                                </div>


                                                <div className="flex items-center gap-2 text-lg font-semibold text-[#E10101]">
                                                    <FaRegStar /> {recipe.ratings}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SomeRecipe;
