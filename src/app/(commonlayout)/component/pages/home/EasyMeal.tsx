"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { RiCameraAiFill } from "react-icons/ri";

const EasyMeal = () => {
    const router = useRouter();

    const userCount = 8;
    const recipeCount = 20;
    const imageCount = 18;

    return (
        <div className="py-10 md:py-20">
            <div
                className="relative h-[24vh] md:h-[40vh] rounded-md"
                style={{
                    backgroundImage: `url('/assets/home/easymeals.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center gap-2 md:py-10 font-semibold">
                    <h1 className="text-2xl md:text-5xl md:my-1 font-serif ">
                        Recipe Hunt <span className="underline underline-offset-2 text-[#E10101] "> Forum</span>
                    </h1>

                    <p className="text-md md:text-lg flex gap-4">
                        <span className="flex justify-center items-center gap-[2px] md:gap-2 "><FaUserFriends  className="text-[#E10101] text-lg md:text-4xl"/><CountUp end={userCount} duration={50} /> Users+</span>
                        <span className="flex justify-center items-center gap-[2px] md:gap-2 "><TbBowlSpoonFilled className="text-[#E10101] text-lg md:text-4xl"/> <CountUp end={recipeCount} duration={50} /> Recipes+</span>
                        <span className="flex justify-center items-center gap-[2px] md:gap-2 "><RiCameraAiFill className="text-[#E10101] text-lg md:text-4xl"/><CountUp end={imageCount} duration={50} /> Images+</span>
                    </p>
                    <Button
                        className="bg-[#E10101] md:mt-4 text-white font-bold hover:bg-gradient-to-r hover:from-[#790d0d] hover:to-[#E10101] rounded-sm text-sm md:text-lg md:animate-bounce"
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
