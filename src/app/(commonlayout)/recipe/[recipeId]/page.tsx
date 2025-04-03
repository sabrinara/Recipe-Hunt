import React from 'react';
import ARecipe from './ARecipe';
import RecipeWriter from './RecipeWriter';
import CookingTimer from './CookingTimer';

const SingleRecipe = () => {
    return (
        <div className='mx-auto container flex flex-col md:flex-row'>
            <div className='w-full md:w-4/6 mb-10'>
                <ARecipe />
            </div>
            <div className='w-full md:w-2/6 flex flex-col-reverse md:flex-col '>

                <RecipeWriter />
                <CookingTimer />
            </div>
        </div>
    );
};

export default SingleRecipe;