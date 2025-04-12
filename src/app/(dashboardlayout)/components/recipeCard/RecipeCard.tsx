"use client";
import { useEffect, useState } from "react";
import { getAllRecipes } from "@/services/RecipeServices";
import { RecipeData } from "@/types";
import { Avatar } from "@heroui/react";
import { FaRegStar } from "react-icons/fa";
import { PiCookingPot } from "react-icons/pi";
import { MdOutlineAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import LoadingPage from "@/app/(commonlayout)/component/pages/shared/LoadingPage";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 6;

  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        const publishedRecipes = data.filter((recipe: RecipeData) => recipe.isPublished === true);
        setRecipes(publishedRecipes);
        setFilteredRecipes(publishedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchTerm, recipes]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  if (loading) return <LoadingPage />;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto container mb-10">
      {/* Search Section */}
      <div
        className="relative w-full h-[20vh] mb-6 rounded-md overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/assets/home/landing2.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(6px)",
          }}
        ></div>
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-center px-4">
          <input
            type="text"
            placeholder="Search recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl p-3 rounded-md backdrop-blur text-black"
          />
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((recipe, index) => (
            <div
              key={index}
              className="relative h-[60vh] rounded-xl overflow-hidden group shadow-lg"
              style={{
                backgroundImage: `url(${recipe.image[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              title="Explore Recipe Details"
              onClick={() => router.push(`/recipe/${recipe._id}`)}
            >
              <div
                className="absolute flex items-center justify-center gap-1 top-4 right-4 text-xl text-[#E10101] cursor-pointer"
                onClick={() => router.push(`/recipe/${recipe._id}`)}
              >
                <FaArrowUpRightFromSquare />
              </div>

              <div className="absolute bottom-[10px] mx-4 left-0 bg-white/50 text-black px-5 py-4 transition-all duration-500 h-[90px] group-hover:h-[250px] group-hover:bg-white rounded-xl">
                <div className="flex justify-between items-center uppercase text-md font-semibold mb-1">
                  <div className="flex items-center gap-1">
                    <MdOutlineAccessTime className="text-[#E10101]" />
                    {recipe.cookingTime < 60 ? (
                      <>{recipe.cookingTime} Minutes</>
                    ) : (
                      <>
                        {Math.floor(recipe.cookingTime / 60)} Hour
                        {Math.floor(recipe.cookingTime / 60) > 1 ? "s" : ""}{" "}
                        {recipe.cookingTime % 60 > 0
                          ? `${recipe.cookingTime % 60} Minutes`
                          : ""}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <PiCookingPot className="text-[#E10101]" />
                    {recipe.difficulty}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[#E10101]">
                  {recipe.name}
                </h3>

                <p className="mt-1 text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                  {recipe.description.slice(0, 180)}...
                </p>

                <div className="flex justify-between items-center my-2">
                  <div className="flex items-center gap-2">
                    <Avatar radius="full" size="lg" src={recipe.user?.imageUrl} />
                    <div className="flex flex-col font-medium font-serif">
                      <h4>{recipe.user?.name}</h4>
                      <p className="text-sm">
                        {new Date(recipe?.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-[#E10101]">
                    <FaRegStar /> {recipe.ratings}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No recipes found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 text-[#E10101] hover:border hover:border-[#E10101] rounded"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-[#E10101] font-medium">
          {currentPage} / {Math.ceil(filteredRecipes.length / recipesPerPage)}
        </span>
        <button
          className="px-4 py-2 text-[#E10101] hover:border hover:border-[#E10101] rounded"
          disabled={indexOfLastRecipe >= filteredRecipes.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
