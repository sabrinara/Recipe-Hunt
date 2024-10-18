"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

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
                        <div
                            className='relative w-full h-[80vh] md:h-[70vh]'
                            style={{
                                backgroundImage: `url('/assets/slide1.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center bg-red-900 opacity-50 py-2">
                                <h1 className='text-3xl md:text-5xl font-thin text-center my-2 text-white italic '>Recipe Hunt</h1>
                                <p className='font-thin text-white text-center my-2 italic '>Share Food & Spend Happiness</p>
                            </div>
                        </div>
                    </div>


                    <div className="embla__slide flex items-center justify-center">
                        <div
                            className='relative w-full h-[80vh] md:h-[70vh]'
                            style={{
                                backgroundImage: `url('/assets/slide2.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center bg-red-900 opacity-50 py-2">
                                <h1 className='text-3xl md:text-5xl font-thin text-center my-2 text-white italic '>Recipe Hunt</h1>
                                <p className='font-thin text-white text-center my-2 italic '>Share Food & Spend Happiness</p>
                            </div>
                        </div>
                    </div>


                    <div className="embla__slide flex items-center justify-center">
                        <div
                            className='relative w-full h-[80vh] md:h-[70vh]'
                            style={{
                                backgroundImage: `url('/assets/slide3.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flexflex-col  items-center justify-center bg-red-900 opacity-50 py-2">
                                <h1 className='text-3xl md:text-5xl font-thin text-center my-2 text-white italic '>Recipe Hunt</h1>
                                <p className='font-thin text-white text-center my-2 italic '>Share Food & Spend Happiness</p>
                            </div>
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

export default HomeCarosel;
