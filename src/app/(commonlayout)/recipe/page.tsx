"use client";
import { useEffect, useState } from "react";
import { getAllRecipes } from "@/services/RecipeServices";
import { RecipeData } from "@/types";
import { Avatar, Image } from "@heroui/react";
import { FaRegStar } from "react-icons/fa";
import { PiCookingPot } from "react-icons/pi";
import { BiSolidTag } from "react-icons/bi";
import { MdOutlineAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import LoadingPage from "../component/pages/shared/LoadingPage";

const RecipeList = () => {
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
                setRecipes(data);
                setFilteredRecipes(data);
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
            recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredRecipes(filtered);
        setCurrentPage(1);
    }, [searchTerm, recipes]);


    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    if (loading)
        return (
            <div>
                <LoadingPage/>
            </div>
        )
    if (error) return <div>{error}</div>;

    return (
        <div className="mx-auto container my-10">
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by title, name, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[70%] md:w-[40%] border border-[#E10101] p-2  rounded-md my-4"
                />
            </div>

            {/* Recipes  */}
            <div className="mx-6 md:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-1 ">
                {currentRecipes.length > 0 ? (
                    currentRecipes.map((recipe, index) => (
                        <div key={index} className="md:p-4 rounded-lg ">
                            <Image
                                src={recipe.image?.[0] || "/fallback.jpg"}
                                alt={recipe.title}
                                width={600}
                                height={400}
                                className="w-full h-40  mt-2 rounded-md"
                                isZoomed
                                onClick={() => router.push(`/recipe/${recipe._id}`)}
                            />

                            <div className="p-4">
                                <div className="flex justify-between items-center uppercase text-lg font-semibold mt-2">
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
                                    <div className="flex items-center gap-1 ">
                                        <PiCookingPot className="text-[#E10101] text-xl" /> {recipe.difficulty}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center" onClick={() => router.push(`/recipe/${recipe._id}`)}>
                                    <h3 className="text-2xl font-semibold text-[#E10101]" >{recipe.name}</h3>
                                    <div className="items-center justify-center gap-1  text-[#E10101]" title="View Recipe Details" >
                                        <FaArrowUpRightFromSquare />
                                    </div>
                                </div>


                                <div className="flex justify-between items-center gap-2">
                                    <div>


                                        <p className=" text-sm font-medium">
                                            {recipe?.description.slice(0, 150)}...
                                        </p>
                                    </div>
                                    <div className="flex flex-warp items-end gap-2 flex-col  py-2 rounded-md font-medium">

                                        {recipe.tags?.map((tag, index) => (
                                            <div className="flex items-center gap-1" key={index}>

                                                <div>
                                                    <h1
                                                        key={index}
                                                        className="text-sm uppercase"
                                                    >
                                                        {tag}
                                                    </h1>
                                                </div>
                                                <div>
                                                    <BiSolidTag className="text-xl text-[#E10101]" />
                                                </div>
                                            </div>))}
                                    </div>

                                </div>



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
                    ))
                ) : (
                    <p className="text-center col-span-3">No recipes found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    className="px-4 py-2 text-[#E10101] hover:border hover:border-[#E10101] rounded "
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-[#E10101] font-medium">{currentPage} / {Math.ceil(filteredRecipes.length / recipesPerPage)}</span>
                <button
                    className="px-4 py-2 text-[#E10101] hover:border hover:border-[#E10101] rounded "
                    disabled={indexOfLastRecipe >= filteredRecipes.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecipeList;
