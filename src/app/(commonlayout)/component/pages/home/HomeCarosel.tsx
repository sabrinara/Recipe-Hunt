"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

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
                            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-center bg-red-50 bg-transparent">
                                <h1 className='text-3xl md:text-5xl font-bold text-center my-2'>Welcome to Recipe Hunt</h1>
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
                             <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-center bg-red-50 bg-transparent">
                                <h1 className='text-3xl md:text-5xl font-bold text-center my-2'>Welcome to Recipe Hunt</h1>
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
                              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-center bg-red-50 bg-transparent">
                                <h1 className='text-3xl md:text-5xl font-bold text-center my-2'>Welcome to Recipe Hunt</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Navigation buttons */}
            <div className='absolute top-1/2 w-full flex justify-between items-center'>
                <button className="embla__prev px-4" onClick={scrollPrev}>
                    Previous
                </button>
                <button className="embla__next px-4" onClick={scrollNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default HomeCarosel;
