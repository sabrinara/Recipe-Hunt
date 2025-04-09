"use client"

import BannerButton from "./BannerButton";
import MotionRecipe from "./MotionRecipe";

export default function Banner() {
  return (
    <div className=" flex bg-transparent" >
      <div className="overflow-visible  ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <MotionRecipe />
          <div className="w-2/5 hidden md:flex flex-col md:px-10">
            <h1 className="text-3xl lg:text-5xl font-semibold mb-2 text-default-900">
              <span className="text-[#E10101] "> Create</span> & Explore Your <span className="text-[#E10101]">Cooking</span> Skill With Recipe <span className="text-[#E10101]">Hunt</span>{" "}

            </h1>
            <h4 className=" text-base  my-4">
              Making food with love, care, thoughts and thousands of flavor. Every dish is a chapter in the story of togetherness.
            </h4>
            <BannerButton />
          </div>
          <div
            className="w-full md:hidden md:px-10 relative flex flex-col items-center text-center p-6"
          >
            {/* Blurred Background */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-lg"
              style={{
                backgroundImage: `url('/assets/bannersm.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "blur(10px)",
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10 text-black px-10 py-5">
              <h1 className="font-semibold mb-2 text-black text-3xl drop-shadow-lg">
                <span className="text-[#E10101]"> Create</span> & Explore <br />
                Your <span className="text-[#E10101]">Cooking</span> Skill <br />
                With Recipe <span className="text-[#E10101]">Hunt</span>{" "}
              </h1>
              <h4 className="text-base my-4 drop-shadow-md">
                Making food with love, care, thoughts, and thousands of flavors. Every dish is a chapter in the story of togetherness.
              </h4>
              <BannerButton />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}