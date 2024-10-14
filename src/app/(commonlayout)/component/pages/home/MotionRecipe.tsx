"use client";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
export default function MotionRecipe() {
  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ y: 40, x: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="w-3/5 flex justify-end gap-2"
    >
      <Image
        alt="Card background"
        className="object-cover rounded-xl h-[80vh] "
        src={`https://images.unsplash.com/photo-1452251889946-8ff5ea7b27ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8`}
      />
      <Image
        alt="Card background"
        className="object-cover rounded-xl h-[80vh]"
        src={`https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
      />
    </motion.div>
  );
}