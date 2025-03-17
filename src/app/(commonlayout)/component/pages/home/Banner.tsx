"use client"
import { Card, CardBody } from "@heroui/react";
import BannerButton from "./BannerButton";
import MotionRecipe from "./MotionRecipe";

export default function Banner() {
  return (
    <Card className=" flex bg-transparent" >
      <CardBody className="overflow-visible  ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <MotionRecipe/>
          <div className="w-full md:w-2/5 md:px-10">
            <h1 className="text-3xl lg:text-5xl font-semibold mb-2 text-default-900 italic">
               <span className="text-[#E10101] "> Create</span> & Explore Your <span className="text-[#E10101]">Cooking</span> Skill With Recipe <span className="text-[#E10101]">Hunt</span>{" "}
          
            </h1>
            <h4 className=" text-base  my-4">
              Making food with love, care, thoughts and thousands of flavor. Every dish is a chapter in the story of togetherness. 
            </h4>
            <BannerButton />
          </div>
     
        </div>
      </CardBody>
    </Card>
  );
}