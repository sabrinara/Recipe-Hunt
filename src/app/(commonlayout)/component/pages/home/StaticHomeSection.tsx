

const StaticHomeSection = () => {
    return (
        <div
            className='relative w-full h-[40vh] md:h-[70vh] my-10 rounded-md'
            style={{
                backgroundImage: `url('/assets/home/landing.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center bg-[#E10101]/60 py-2 mb-10">
                <h1 className='text-2xl md:text-5xl font-semibold text-center my-4 text-white'>Spice up your taste with Recipe Hunt!</h1>
                
            </div>
        </div>
    );
};

export default StaticHomeSection;