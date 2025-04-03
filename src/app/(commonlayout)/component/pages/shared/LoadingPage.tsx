"use client"
// import { Image } from '@heroui/react';
import { Spinner } from '@heroui/spinner';

import React from 'react';

const LoadingPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-row justify-center items-center'>
                <p className="text-2xl text-[#E10101] font-serif  mr-2">Recipe Hunt</p> 
                 <Spinner classNames={{ label: "text-foreground mt-4" }}  color="danger" variant="dots" className='text-2xl'/>
            </div>
          

        </div>
    );
};

export default LoadingPage;