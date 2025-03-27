import React from 'react';
import ARecipe from './ARecipe';
import RecipeWriter from './RecipeWriter';

const SingleRecipe = () => {
    return (
        <div className='mx-auto container flex'>
            <div className='w-4/6'>
                <ARecipe />
            </div>
            <div className='w-2/6'>
                <RecipeWriter />
            </div>
        </div>
    );
};

export default SingleRecipe;