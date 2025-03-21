"use client";
import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { RecipeData } from "@/types";
import { getAllRecipes } from "@/services/RecipeServices";

const SomeRecipe = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

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

  // Helper function to create 3-item chunks from the recipes array
  const chunkArray = (arr: RecipeData[], size: number) => {
    const result: RecipeData[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // Chunk recipes into groups of 3
  const recipeChunks = chunkArray(recipes, 3);

  return (
    <div className="embla relative">
      <div className="embla__viewport mt-12 h-80 md:h-[70vh] w-full rounded-t-xl" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {recipeChunks.map((chunk, index) => (
            <div className="embla__slide flex w-full items-center justify-around rounded-xl gap-2" key={index}>
              {chunk.map((recipe, recipeIndex) => (
                <div
                  key={recipeIndex}
                  className="relative w-1/3 h-[80vh] md:h-[70vh] rounded-t-xl overflow-hidden group shadow-lg"
                  style={{
                    backgroundImage: `url(${recipe.image})`, // Assuming you have imageUrl in your recipe data
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Title always visible, paragraph shows on hover */}
                  <div className="absolute bottom-[10px] mx-4 left-0  bg-white/50 text-black p-4 transition-all duration-500 h-[70px] group-hover:h-[240px] group-hover:bg-white">
                    <h3 className="text-xl font-semibold">{recipe.title}</h3>
                    <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                      {recipe.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SomeRecipe;
