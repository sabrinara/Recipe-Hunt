'use client';

import LoadingPage from '@/app/(commonlayout)/component/pages/shared/LoadingPage';
import { myRecipe } from '@/services/RecipeServices';
import { RecipeData } from '@/types';
import { Button, Image } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditModel from './EditModel';
import DeleteModel from './DeleteModel';

const MyAllRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(10);

    // State to hold the recipe to be edited
    const [editRecipe, setEditRecipe] = useState<RecipeData | null>(null);
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

            const data = await myRecipe(token);

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

    // Pagination logic
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const handleEdit = (recipe: RecipeData) => setEditRecipe(recipe);
    const handleDelete = (recipe: RecipeData) => setDeleteRecipe(recipe);

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
                        <th className="px-4 py-2 text-left">Edit</th>
                        <th className="px-4 py-2 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecipes.map((recipe) => (
                        <tr key={recipe._id} className="border-t border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                            <td className="px-2 py-2">
                                <Image src={recipe.image[0]} alt={recipe.name} className="w-16 h-16 object-cover rounded" />
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
                            <td className="px-4 py-2">{recipe.ratings[0] ?? 'N/A'}</td>
                            <td className="px-1 py-1 ">
                                <Button onPress={() => handleEdit(recipe)} className="text-blue-500 hover:text-blue-700">
                                    <FaEdit />
                                </Button>
                            </td>
                            <td className="px-4 py-2">
                                <Button onPress={() => handleDelete(recipe)} className="text-red-500 hover:text-red-700">
                                    <FaTrashAlt />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
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
                        className={`px-2 py-1 mx-5 ${currentPage === index + 1 ? 'bg-[#E10101] text-white' : 'bg-gray-200'} rounded-md mx-1`}
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

            {editRecipe && (
                <EditModel
                    recipe={editRecipe}
                    isOpen={true}
                    onClose={() => setEditRecipe(null)}
                    onUpdateSuccess={() => {
                        fetchRecipes();         
                        setEditRecipe(null);   
                    }}
                />
            )}


            {deleteRecipe && (
                <DeleteModel
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

export default MyAllRecipes;
