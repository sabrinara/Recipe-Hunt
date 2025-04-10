'use client';

import LoadingPage from '@/app/(commonlayout)/component/pages/shared/LoadingPage';
import { myRecipe } from '@/services/RecipeServices';
import { RecipeData } from '@/types';
import { Image } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons for edit and delete

const MyAllRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state to handle failed fetch
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [recipesPerPage] = useState(6); // Set the number of recipes per page

  // Fetch recipes from API
  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Get token from localStorage
  
      if (!token) {
        console.error('No token found');
        setLoading(false);
        setError('No token found');
        return;
      }
  
      const data = await myRecipe(token); 
      console.log("Fetched Data:", data); 
  
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

  if (loading) return <p className="text-center py-10"><LoadingPage /></p>;

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  if (recipes.length === 0) return <p className="text-center py-10">No recipes found.</p>;

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handleEdit = (id: string) => {
    console.log("Edit recipe with id:", id); // Add logic for editing a recipe
  };

  const handleDelete = (id: string) => {
    console.log("Delete recipe with id:", id); // Add logic for deleting a recipe
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
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
            <tr key={recipe._id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">
                <Image src={recipe.image[0]} alt={recipe.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="px-4 py-2">{recipe.name}</td>
              <td className="px-4 py-2">{recipe.title}</td>
              <td className="px-4 py-2">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1">
                    {tag}
                  </span>
                ))}
              </td>
              <td className="px-4 py-2">{recipe.cookingTime} min</td>
              <td className="px-4 py-2 capitalize">{recipe.difficulty}</td>
              <td className="px-4 py-2">{recipe.ratings[0] ?? 'N/A'}</td>
              <td className="px-4 py-2 ">
                <button onClick={() => handleEdit(recipe._id)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                </td>
                <td className="px-4 py-2">
                <button onClick={() => handleDelete(recipe._id)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
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
          className="px-4 py-2 bg-gray-300 rounded-l-md"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-[#E10101] text-white' : 'bg-gray-200'} rounded-md mx-1`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyAllRecipes;
