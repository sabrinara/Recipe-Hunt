'use client';

import React from 'react';

const SharedTitle = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="text-center my-10">
            <h1 className="text-4xl font-bold ">{title}
                <span className="mt-2 text-xl text-gray-600">{subtitle}</span></h1>
        </div>
    );
};

export default SharedTitle;
