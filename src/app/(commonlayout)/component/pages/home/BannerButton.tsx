"use client";
import { Button } from "@nextui-org/react";

const BannerButton = () => {
  return (
    <div className="space-x-2 md:space-x-5 text-center mt-4 md:mt-10 ">
      <Button onClick={() => console.log("Hello")} className="bg-gradient-to-l from-red-500 to-red-800 text-white font-bold hover:bg-gradient-to-r hover:from-red-800 hover:to-red-500 rounded-sm text-sm md:text-base"  >
        Create Recipe
      </Button>
      <Button className="border border-red-500 text-red-500 font-bold rounded-sm text-sm md:text-base" variant="bordered" >
        Learn More
      </Button>
    </div>
  );
};

export default BannerButton;