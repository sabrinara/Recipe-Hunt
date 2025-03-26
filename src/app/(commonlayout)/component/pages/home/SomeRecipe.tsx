"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { RecipeData } from "@/types";
import { getAllRecipes } from "@/services/RecipeServices";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { Avatar } from "@heroui/react";
import { useRouter } from "next/navigation";


const SomeRecipe = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeData = await getAllRecipes();
                setRecipes(recipeData.slice(0, 6));

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
            <div className="embla__viewport mt-12 h-[60vh] md:h-[70vh] w-full rounded-t-xl" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {recipeChunks.map((chunk, index) => (
                        <div className="embla__slide flex w-full items-center justify-around rounded-xl gap-3" key={index}>
                            {chunk.map((recipe, recipeIndex) => {

                                return (
                                    <div

                                        key={recipeIndex}
                                        className="relative w-1/3 h-[60vh] md:h-[70vh] rounded-xl overflow-hidden group shadow-lg"
                                        style={{
                                            backgroundImage: `url(${recipe.image[0]})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                        title="Explore More Recipe"


                                    >
                                        <div className="absolute flex items-center justify-center gap-1 top-4 right-4 text-xl text-[#E10101]" title="Explore More Recipe" onClick={() => router.push("/recipe")}>
                                            <FaArrowUpRightFromSquare />
                                        </div>
                                        <div className="absolute bottom-[10px] md:bottom-[10px] mx-4 left-0 bg-white/50 text-black px-5 py-2 md:py-4 transition-all duration-500 h-[90px] md:h-[90px] group-hover:h-[310px] group-hover:bg-white  
md:group-hover:h-[250px] rounded-xl">
                                            <div className="flex justify-between items-center uppercase text-md md:text-lg font-semibold">
                                                <div className="flex items-center gap-1 ">
                                                <MdOutlineAccessTime className="text-[#E10101] text-xl font-extrabold" />
                                                    {recipe.cookingTime < 60
                                                        ? <>{recipe.cookingTime} Minutes</>
                                                        : <>
                                                            {Math.floor(recipe.cookingTime / 60)} Hour{Math.floor(recipe.cookingTime / 60) > 1 ? "s" : ""}{" "}
                                                            {recipe.cookingTime % 60 > 0 ? `${recipe.cookingTime % 60} Minutes` : ""}
                                                        </>
                                                    }
                                                </div>
                                                <div className="flex items-center gap-1">
                                                <PiCookingPot className="text-[#E10101] text-xl" /> {recipe.difficulty}
                                                </div>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-semibold text-[#E10101]" >{recipe.name}</h3>
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
