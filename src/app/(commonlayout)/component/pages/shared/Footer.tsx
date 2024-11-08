"use client";

import { Image, Link } from '@nextui-org/react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


export default function Footer() {
  return (
    <div>
      <div className="py-16"   style={{
                                backgroundImage: `url('/assets/footer.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                opacity: "85%"
                            }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <Link href="/">
                <div className="flex items-center">
                  <Image src="/assets/footerlogo.png" className="h-14 md:h-28" alt="Logo" />
                </div>
              </Link>
              <p className="mb-2 text-sm text-red-700 font-bold">&copy; 2024 Recipe Hunt. All rights reserved.</p>
            </div>
            < div className='flex flex-col justify-between items-center gap-4 my-10'>
              <div className="flex space-x-4 mb-4 md:mb-0 text-white font-bold">
                <a href="/about" className="hover:text-white underline">
                  About
                </a>
                <a href="/contact" className="hover:text-white underline">
                  Contact
                </a>
                <a href="/privacy" className="hover:text-white underline">
                  Privacy Policy
                </a>
              </div>
              {/* Social Links */}
              <div className="flex space-x-4 text-red-700">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaFacebookF size={20} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaTwitter size={20} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  <FaLinkedinIn size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}