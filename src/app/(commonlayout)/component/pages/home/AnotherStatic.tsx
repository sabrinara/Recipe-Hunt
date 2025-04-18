

const AnotherStatic = () => {
    return (

        <div
            className='relative w-full h-[40vh] md:h-[70vh]'
            style={{
                backgroundImage: `url('/assets/slide1.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center bg-[#E10101]/80 py-2">
                <h1 className='text-4xl md:text-5xl font-semibold text-center my-2 text-white'>Explore and Create with Recipe Hunt!</h1>
                {/* <p className='font-thin text-white text-center my-2 italic '>Share Food & Spend Happiness</p> */}
            </div>
        </div>

    );
};

export default AnotherStatic;