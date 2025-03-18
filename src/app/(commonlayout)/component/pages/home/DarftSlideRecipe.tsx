
"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';
import { Image } from "@heroui/react"

const SomeRecipe = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 2000 })
    ])

    

    return (
        <div className="embla relative">
            <div className="embla__viewport mt-12 h-80 md:h-[80vh] w-full rounded-xl" ref={emblaRef}>
                <div className='embla__container flex h-full'>
                    {/* Slide 1 */}
                    <div className="embla__slide flex w-full items-center justify-around  rounded-xl ">
                        <div className='w-1/2 p-4 '>
                            <Image src="/assets/slide1.jpg" alt="Slide 1"  className='h-[70vh]'/>
                            <h1>Hello</h1>
                        </div>
                        <div className='w-1/2 p-4  '>
                            <Image src="/assets/slide2.jpg" alt="Slide 2"  className='h-[70vh]'/>
                            <h1>Hello</h1>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div className="embla__slide flex w-full items-center justify-around  rounded-xl ">
                        <div className='w-1/2 p-4 '>
                            <Image src="/assets/slide1.jpg" alt="Slide 1"  className='h-[70vh]'/>
                            <h1>Hello</h1>
                        </div>
                        <div className='w-1/2 p-4  '>
                            <Image src="/assets/slide2.jpg" alt="Slide 2"  className='h-[70vh]'/>
                            <h1>Hello</h1>
                        </div>
                    </div>
                    {/* Slide 3 */}
                    <div className="embla__slide flex w-full items-center justify-around  rounded-xl ">
                        <div className='w-1/2 p-4 '>
                            <Image src="/assets/slide1.jpg" alt="Slide 1"  className='h-[70vh]'/>
                            <h1>Hello</h1>
                        </div>
                        <div className='w-1/2 p-4  '>
                            <Image src="/assets/slide2.jpg" alt="Slide 2"  className='h-[70vh]'/>
                            <h1>Hello</h1>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    )
}

export default SomeRecipe;
