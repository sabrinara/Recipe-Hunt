// "use client"
// import Lottie from "lottie-react";
// import ani from "../../public/assets/Animation/loading.json";

// import Image from "next/image";

const LoadingPage = () => {
    return (
        <div className=" h-screen">
            <div className="flex flex-col justify-center items-center h-screen duration-5000">

                <div className="flex md:ml-5 items-center animate-bounce">

                    {/* <Image src="./navlogo.png" className="w-44 h-32 mr-2" alt="" /> */}
                   
                </div>
                {/* <Lottie animationData={ani} loop={true} /> */}
                <p className="text-3xl text-[#E10101] font-mono animate-bounce">Recipe Hunt...</p>
            </div>

        </div>
    );
};

export default LoadingPage;