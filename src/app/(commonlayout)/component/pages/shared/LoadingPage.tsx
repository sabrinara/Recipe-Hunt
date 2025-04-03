"use client"
// import { Image } from '@heroui/react';
import { Spinner } from '@heroui/spinner';

import React from 'react';

const LoadingPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            {/* <Image src="/assets/navlogo.png" alt="nav logo" className="w-40 md:w-60 h-12 md:h-[70px] " /> */}
            <div className='flex flex-row justify-center items-center'>
                <p className="text-3xl text-[#E10101] font-serif  mr-2">Recipe Hunt Loading</p> 
                 <Spinner classNames={{ label: "text-foreground mt-4" }}  color="danger" variant="spinner" className='text-2xl'/>
            </div>
          

        </div>
    );
};

export default LoadingPage;