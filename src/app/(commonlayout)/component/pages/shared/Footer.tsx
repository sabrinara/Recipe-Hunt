"use client";

import { Image, Link } from "@heroui/react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


export default function Footer() {
  return (
 
      <div
        className="w-full  md:px-10 relative  text-center p-6"
      >
        {/* <div className="absolute inset-0 bg-black/80 backdrop-blur-lg py-16"
          style={{
            backgroundImage: `url('/assets/footer.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: "blur(10px)",
          }}> </div> */}
        <div className="relative z-10">
          <div className="flex flex-col-reverse md:flex-row  items-center justify-between md:mx-14 ">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <Link href="/">
                <div className="flex items-center">
                  <Image src="/assets/footerlogo.png" className="h-20 md:h-28" alt="Logo" />
                </div>
              </Link>
              <p className="mb-2 text-sm  font-bold">&copy; 2024 Recipe Hunt. All rights reserved.</p>
            </div>
            < div className='flex flex-col justify-between items-center gap-4 my-10'>
              <div className="flex space-x-4 mb-4 md:mb-0  font-bold">
                <a href="/about" className=" underline">
                  About
                </a>
                <a href="/contact" className=" underline">
                  Contact
                </a>
                <a href="/privacy" className=" underline">
                  Privacy Policy
                </a>
              </div>
             
              <div className="flex space-x-4   md:text-[#E10101]">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" >
                  <FaTwitter size={20} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" >
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
 
  );
}