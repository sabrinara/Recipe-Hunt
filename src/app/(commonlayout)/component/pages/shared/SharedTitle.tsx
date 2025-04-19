'use client';

import React from 'react';

const SharedTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="text-center my-10">
            <h1 className="text-3xl md:text-5xl md:my-14 font-serif text-center font-semibold">{title} <span className=" underline underline-offset-2 text-[#E10101]">{subtitle}</span></h1>
        </div>
    );
};

export default SharedTitle;
