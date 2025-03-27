"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import React from "react";

const EasyMeal = () => {
    const router = useRouter();

    // Example Data
    const userCount = 8;
    const recipeCount = 20;
    const imageCount = 18;

    return (
        <div className="py-10 md:py-20">
            <div
                className="relative h-[16vh] md:h-[40vh] rounded-md"
                style={{
                    backgroundImage: `url('/assets/home/easymeals.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center gap-2 md:py-10">
                    <h1 className="text-3xl md:text-5xl md:my-1 font-serif md:animate-bounce">
                        Easy Meals <span className="underline underline-2 text-[#E10101]"> Forum</span>
                    </h1>
                    <p className="text-md md:text-lg flex gap-4">
                        <span>👤 <CountUp end={userCount} duration={50} /> Users+</span>
                        <span>🍽️ <CountUp end={recipeCount} duration={50} /> Recipes+</span>
                        <span>📸 <CountUp end={imageCount} duration={50} /> Images+</span>
                    </p>
                    <Button
                        className="bg-[#E10101] md:mt-4 rounded text-sm md:text-lg"
                        onClick={() => router.push("/login")}
                    >
                        Join Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EasyMeal;
