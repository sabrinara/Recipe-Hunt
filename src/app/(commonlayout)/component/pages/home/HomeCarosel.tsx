"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Image } from '@nextui-org/react';

const HomeCarosel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 2000 })])
    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])
    return (
        <div className="embla relative" >
            
            <div className="embla__viewport mt-12 h-80 md:h-[70vh] w-full border" ref={emblaRef}>
                <div className='embla__container h-full'>
                    <div className="embla__slide flex items-center justify-center">
                        <Image alt='slide1' src={`../../../../../../public/assets/slide1.jpg`} 
                        className="w-[100vh]"/>
                    </div>
                    <div className="embla__slide flex items-center justify-center">
                        <Image alt='slide2' src={`../../../../../../public/assets/slide2.jpg`}  className="w-[100vh]"/>
                    </div>
                    <div className="embla__slide flex items-center justify-center">
                        <Image alt='slide3' src={`../../../../../../public/assets/slide3.jpg`}  className="w-[100vh]"/>
                    </div>
                 
                </div>
            </div>
            <div className='absolute top-1/2 font-bold'>
             <div className='flex justify-between items-center'>
             <button className="embla__prev px-4" onClick={scrollPrev}>
                    Previous
                </button>
                <button className="embla__next ml-52 md:ml-[174vh]" onClick={scrollNext}>
                    Next
                </button>
             </div>
            </div>
        </div>
    )
};

export default HomeCarosel;



