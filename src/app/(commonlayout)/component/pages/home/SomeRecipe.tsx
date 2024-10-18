"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { Image } from '@nextui-org/react'

const SomeRecipe = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 2000 })
    ])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

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

            {/* Navigation buttons */}
            <div className='absolute top-1/2 w-full flex justify-between items-center'>
                <button className="embla__prev px-4 text-xl md:text-2xl pb-10" onClick={scrollPrev}>
                    <FaArrowCircleLeft />
                </button>
                <button className="embla__next px-4 text-xl md:text-2xl pb-10" onClick={scrollNext}>
                    <FaArrowCircleRight />
                </button>
            </div>
        </div>
    )
}

export default SomeRecipe;
