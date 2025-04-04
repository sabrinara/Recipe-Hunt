import React from 'react';
import ARecipe from './ARecipe';
import RecipeWriter from './RecipeWriter';
import CookingTimer from './CookingTimer';
import ExtraSection from './ExtraSection';
import ExtraSection1 from './ExtraSection1';
import ExtraSection2 from './ExtraSection2';

const SingleRecipe = () => {
    return (
        <div className='mx-auto container flex flex-col md:flex-row'>
            <div className='w-full md:w-4/6 mb-10'>
                <ARecipe />
            </div>
            <div className='w-full md:w-2/6 flex flex-col-reverse md:flex-col '>
                <ExtraSection />
                <RecipeWriter />
        <ExtraSection1/>
                <CookingTimer />
                <ExtraSection2/>
            </div>
        </div>
    );
};

export default SingleRecipe;