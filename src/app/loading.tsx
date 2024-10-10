

const LoadingPage = () => {
    return (
        <div className="bg-[#000924] h-screen">
            <div className="flex flex-col justify-center items-center h-screen duration-5000">

                <div className="flex md:ml-5 items-center animate-bounce">

                    {/* <img src="./navlogo3.png" className="h-32 mr-2" alt="" /> */}
                   
                </div>
                <p className="text-3xl text-[#42f5f5] font-mono">Loading...</p>
            </div>

        </div>
    );
};

export default LoadingPage;