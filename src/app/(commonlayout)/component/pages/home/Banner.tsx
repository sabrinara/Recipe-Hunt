"use client"
import { Card, CardBody } from "@nextui-org/react";
import BannerButton from "./BannerButton";
import MotionRecipe from "./MotionRecipe";

export default function Banner() {
  return (
    <Card className="py-4 flex" shadow="none">
      <CardBody className="overflow-visible py-2 ">
        <div className="flex items-center justify-between gap-6">
        <MotionRecipe />
          <div className="w-2/5 px-10">
            <h1 className="text-2xl md:text-5xl font-semibold mb-2 text-default-900 italic">
               <span className="text-red-500 "> Create</span> & Explore Your <span className="text-red-500">Cooking</span> Skill With Recipe <span className="text-red-500">Hunt</span>{" "}
          
            </h1>
            <h4 className=" text-base text-red-300 my-4">
              Making food with love, care, thoughts and thousands of flavor. Every dish is a chapter in the story of togetherness. 
            </h4>
            <BannerButton />
          </div>
     
        </div>
      </CardBody>
    </Card>
  );
}