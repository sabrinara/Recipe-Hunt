"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';
import { Image } from "@heroui/react"
// import { Card, CardFooter } from "@heroui/react";
const SomeRecipe = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 })
    ])



    return (
        <div className="embla relative">
            <div className="embla__viewport mt-12 h-80 md:h-[70vh] w-full rounded-t-xl" ref={emblaRef}>
                <div className='embla__container flex h-full'>
                    {/* Slide 1 */}
                    <div className="embla__slide flex w-full items-center justify-around rounded-xl gap-2">
                        <div
                            className="relative w-1/3 h-[80vh] md:h-[70vh] rounded-t-xl overflow-hidden group shadow-lg"
                            style={{
                                backgroundImage: `url('/assets/slide2.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Title always visible, paragraph shows on hover */}
                            <div className="absolute bottom-[10px] mx-4 left-0  bg-white/50 text-black p-4 transition-all duration-500 h-[70px] group-hover:h-[240px] group-hover:bg-white">
                                <h3 className="text-xl font-semibold">Coming Soon</h3>
                                <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                    This item will be available soon. Stay tuned! This item will be available soon. Stay tuned! This item will be available soon. Stay tuned!
                                </p>
                                <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                    This item will be available soon. Stay tuned! This item will be available soon. Stay tuned! This item will be available soon. Stay tuned!
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative w-1/3 h-[80vh] md:h-[70vh] rounded-t-xl overflow-hidden group shadow-lg"
                            style={{
                                backgroundImage: `url('/assets/slide3.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Title always visible, paragraph shows on hover */}
                            <div className="absolute bottom-[10px] mx-4 left-0  bg-white/50 text-black p-4 transition-all duration-500 h-[70px] group-hover:h-[240px] group-hover:bg-white">
                                <h3 className="text-xl font-semibold">Coming Soon</h3>
                                <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                    This item will be available soon. Stay tuned! This item will be available soon. Stay tuned! This item will be available soon. Stay tuned!
                                </p>
                                <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                    This item will be available soon. Stay tuned! This item will be available soon. Stay tuned! This item will be available soon. Stay tuned!
                                </p>
                            </div>
                        </div>
                        <div
                            className="relative w-1/3 h-[80vh] md:h-[70vh] rounded-t-xl overflow-hidden group shadow-lg"
                            style={{
                                backgroundImage: `url('/assets/slide1.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Title always visible, paragraph shows on hover */}
                            <div className="absolute bottom-[10px] mx-4 left-0  bg-white/50 text-black p-4 transition-all duration-500 h-[70px] group-hover:h-[240px] group-hover:bg-white">
                                <h3 className="text-xl font-semibold">Coming Soon</h3>
                                <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                    This item will be available soon. Stay tuned! This item will be available soon. Stay tuned! This item will be available soon. Stay tuned!
                                </p>
                                <p className="text-sm opacity-0 invisible transition-opacity duration-500 group-hover:opacity-100 group-hover:visible">
                                    This item will be available soon. Stay tuned! This item will be available soon. Stay tuned! This item will be available soon. Stay tuned!
                                </p>
                            </div>
                        </div>
                    
                </div>
                {/* Slide 2 */}
                <div className="embla__slide flex w-full items-center justify-around  rounded-xl ">
                    <div className='w-1/2 p-4 '>
                        <Image src="/assets/slide1.jpg" alt="Slide 1" className='h-[70vh]' />
                        <h1>Hello</h1>
                    </div>
                    <div className='w-1/2 p-4  '>
                        <Image src="/assets/slide2.jpg" alt="Slide 2" className='h-[70vh]' />
                        <h1>Hello</h1>
                    </div>
                </div>
                {/* Slide 3 */}
                <div className="embla__slide flex w-full items-center justify-around  rounded-xl ">
                    <div className='w-1/2 p-4 '>
                        <Image src="/assets/slide1.jpg" alt="Slide 1" className='h-[70vh]' />
                        <h1>Hello</h1>
                    </div>
                    <div className='w-1/2 p-4  '>
                        <Image src="/assets/slide2.jpg" alt="Slide 2" className='h-[70vh]' />
                        <h1>Hello</h1>
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}

export default SomeRecipe;
