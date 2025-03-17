"use client";
import { Button } from "@heroui/react";

const BannerButton = () => {
  return (
    <div className="space-x-2 md:space-x-5 text-center mt-4 md:mt-10 ">
      <Button onClick={() => console.log("Hello")} className="bg-gradient-to-l from-[#E10101] to-[#790d0d] text-white font-bold hover:bg-gradient-to-r hover:from-[#790d0d] hover:to-[#E10101] rounded-sm text-sm md:text-base"  >
        Create Recipe
      </Button>
      <Button className="border border-[#E10101] text-[#E10101] font-bold rounded-sm text-sm md:text-base" variant="bordered" >
        Learn More
      </Button>
    </div>
  );
};

export default BannerButton;