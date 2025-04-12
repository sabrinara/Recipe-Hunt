'use client';

import LoadingPage from '@/app/(commonlayout)/component/pages/shared/LoadingPage';
import { getAllRecipes } from '@/services/RecipeServices';
import { RecipeData } from '@/types';
import { Button, Image } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import RecipeDeleteAdmin from './RecipeDeleteAdmin';
import { recipePublished, recipeUnpublished } from '@/services/AdminServics';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RecipeManger = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(8);
    const router = useRouter();



    const [deleteRecipe, setDeleteRecipe] = useState<RecipeData | null>(null);

    const fetchRecipes = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                console.error('No token found');
                setLoading(false);
                setError('No token found');
                return;
            }

            const data = await getAllRecipes();

            if (data) {
                setRecipes(data);
            } else {
                setError('No recipes found or wrong data format.');
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Failed to fetch recipes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    if (loading) return <div className="text-center py-10"><LoadingPage /></div>;

    if (error) return <div className="text-center py-10 text-[#E10101]">{error}</div>;

    if (recipes.length === 0) return <div className="text-center py-10 text-xl font-bold">No recipes found.</div>;


    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(recipes.length / recipesPerPage);


    const handleDelete = (recipe: RecipeData) => setDeleteRecipe(recipe);

    const handlePublish = async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return alert('No token found');
        try {
            await recipePublished(id, token);
            toast("Recipe Published!")
            fetchRecipes();
        } catch (err) {
            console.error("Publish failed", err);
        }
    };

    const handleUnpublish = async (id: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) return alert('No token found');
        try {
            await recipeUnpublished(id, token);
            toast("Recipe unpublished!")
            fetchRecipes();
        } catch (err) {
            console.error("Unpublish failed", err);
        }
    };


    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full border border-gray-300 dark:border-gray-800 text-sm">
                <thead className="">
                    <tr>
                        <th className="px-2 py-2 text-left">Image</th>
                        <th className="px-2 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Tags</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Difficulty</th>
                        <th className="px-4 py-2 text-left">Rating</th>
                        <th className="px-4 py-2 text-left">Publish/Unpublish</th>
                        <th className="px-4 py-2 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecipes.map((recipe) => (
                        <tr key={recipe._id} className="border-t border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                            <td className="px-2 py-2" >
                                <Image src={recipe.image[0]} alt={recipe.name} className="w-16 h-16 object-cover rounded"  title="Explore Recipe Details"
              onClick={() => router.push(`/recipe/${recipe._id}`)} />
                            </td>
                            <td className="px-2 py-2">{recipe.name}</td>
                            <td className="px-4 py-2">{recipe.title}</td>
                            <td className="px-4 py-2">
                                {recipe.tags.map((tag) => (
                                    <span key={tag} className="inline-block bg-green-100 dark:bg-[#E10101]/30 text-green-700 dark:text-white text-xs px-2 py-1 rounded mr-1 mb-1">
                                        {tag}
                                    </span>
                                ))}
                            </td>
                            <td className="px-4 py-2">{recipe.cookingTime} min</td>
                            <td className="px-4 py-2 capitalize">{recipe.difficulty}</td>
                            <td className="px-4 py-2">
                                {recipe?.ratings?.length ? (
                                    (() => {
                                        const avgRating =
                                            recipe.ratings.reduce((acc, rating) => acc + rating, 0) / recipe.ratings.length;
                                        return <span className="text-base font-medium">{avgRating.toFixed(1)}</span>;
                                    })()
                                ) : (
                                    <span className="text-gray-500">No ratings</span>
                                )}
                            </td>



                            <td className="px-4 py-2">
                                {recipe.isPublished ? (
                                    <Button onPress={() => handleUnpublish(recipe._id)} className="bg-yellow-500 text-white">
                                        Unpublish
                                    </Button>
                                ) : (
                                    <Button onPress={() => handlePublish(recipe._id)} className="bg-green-600 text-white">
                                        Publish
                                    </Button>
                                )}
                            </td>
                            <td className="px-4 py-2">
                                <Button onPress={() => handleDelete(recipe)} className="bg-[#E10101] text-white ">
                                    <FaTrashAlt />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center py-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className=""
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-2 py-1 mx-1 ${currentPage === index + 1 ? 'bg-[#E10101] text-white' : ''} rounded-md`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className=""
                >
                    Next
                </button>
            </div>



            {deleteRecipe && (
                <RecipeDeleteAdmin
                    recipe={deleteRecipe}
                    isOpen={true}
                    onClose={() => setDeleteRecipe(null)}
                    onDeleted={(id) => {
                        console.log("Deleted recipe ID:", id);
                        setDeleteRecipe(null);
                        fetchRecipes();
                    }}
                />
            )}

        </div>
    );
};

export default RecipeManger;
