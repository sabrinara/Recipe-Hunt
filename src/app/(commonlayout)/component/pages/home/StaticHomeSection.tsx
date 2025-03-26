

const StaticHomeSection = () => {
    return (
        <div
            className='relative w-full h-[40vh] md:h-[90vh] my-10 rounded-md'
            style={{
                backgroundImage: `url('/assets/home/landing.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex flex-col items-center justify-center bg-[#E10101]/50 py-2">
                <h1 className='text-4xl md:text-8xl font-semibold text-center my-4 text-white italianno '>Spice up your taste with Recipe Hunt!</h1>
                
            </div>
        </div>
    );
};

export default StaticHomeSection;