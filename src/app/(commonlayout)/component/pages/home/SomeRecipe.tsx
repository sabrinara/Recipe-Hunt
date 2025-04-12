"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { RecipeData } from "@/types";
import { getAllRecipes } from "@/services/RecipeServices";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
// import { FaRegStar } from "react-icons/fa";
import { Avatar, Button } from "@heroui/react";
import { useRouter } from "next/navigation";


const SomeRecipe = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 10000 }),
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllRecipes();
                const recipeData = data.filter((recipe: RecipeData) => recipe.isPublished === true);               
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
        <div className="embla relative my-4 md:my-10">
            <div className="embla__viewport md:mt-12 h-[50vh] md:h-[70vh] w-full rounded-t-xl" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {recipeChunks.map((chunk, index) => (
                        <div className="embla__slide flex w-full items-center justify-around rounded-xl gap-3" key={index}>
                            {chunk.map((recipe, recipeIndex) => {

                                return (
                                    <div

                                        key={recipeIndex}
                                        className="relative w-1/2 md:w-1/3 h-[50vh] md:h-[70vh] rounded-xl overflow-hidden group shadow-lg"
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
                                        <div className="absolute bottom-[10px] md:bottom-[10px] mx-1 md:mx-4 left-0 right-0 bg-white/50 text-black px-3 py-2 md:py-4 transition-all duration-500 h-[90px] md:h-[90px] group-hover:h-[200px] group-hover:bg-white  md:group-hover:h-[250px] rounded-xl">
                                            <div className="hidden md:flex justify-between items-center uppercase text-sm md:text-lg font-semibold mx-2">
                                                <div className="flex items-center gap-1 ">
                                                    <MdOutlineAccessTime className="text-[#E10101] text-sm md:text-xl font-extrabold" />
                                                    {recipe.cookingTime < 60
                                                        ? <>{recipe.cookingTime} Minutes</>
                                                        : <>
                                                            {Math.floor(recipe.cookingTime / 60)} Hour{Math.floor(recipe.cookingTime / 60) > 1 ? "s" : ""}{" "}
                                                            {recipe.cookingTime % 60 > 0 ? `${recipe.cookingTime % 60} Minutes` : ""}
                                                        </>
                                                    }
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <PiCookingPot className="text-[#E10101] text-sm md:text-xl" /> {recipe.difficulty}
                                                </div>
                                            </div>

                                            <h3 className="text-lg md:text-2xl font-semibold text-[#E10101]" >{recipe.name}</h3>
                                           <div className="flex flex-col md:hidden">
                                           <div className="flex md:hidden justify-between  uppercase text-xs font-semibold">
                                                <div className="flex items-center gap-1 ">
                                                    <MdOutlineAccessTime className="text-[#E10101] text-xs font-extrabold" />
                                                    {recipe.cookingTime < 60
                                                        ? <>{recipe.cookingTime} Minutes</>
                                                        : <>
                                                            {Math.floor(recipe.cookingTime / 60)} Hour{Math.floor(recipe.cookingTime / 60) > 1 ? "s" : ""}{" "}
                                                            {recipe.cookingTime % 60 > 0 ? `${recipe.cookingTime % 60} Minutes` : ""}
                                                        </>
                                                    }
                                                </div>
                                                <div className="flex items-center  gap-1">
                                                    <PiCookingPot className="text-[#E10101] text-xs" /> {recipe.difficulty}
                                                </div>
                                            </div>
                                            <p className="flex md:hidden mt-1 text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                                {recipe.description.slice(0, 70)}...
                                            </p>
                                           </div>
                                            <p className="hidden md:flex mt-1 text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                                {recipe.description.slice(0, 200)}...
                                            </p>




                                            <div className="flex justify-between items-center md:mt-4">
                                                <div className="hidden md:flex  items-center justify-center gap-2 ">
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


                                                <div className="flex justify-center items-center text-lg font-semibold text-[#E10101]">
                                                    {/* <FaRegStar /> {recipe.ratings} */}
                                                    <Button onClick={() => router.push("/recipe")} className="rounded-md mt-1 px-[74px] md:px-4 py-1 md:py-2 bg-[#E10101] text-white">More</Button>
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
