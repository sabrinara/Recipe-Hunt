

const AboutBanner = () => {
    return (
        <div className="mx-auto container">
        <div
                className="relative w-full h-[60vh] mb-6 rounded-md overflow-hidden"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('/assets/bannersm.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "blur(2px)",
                    }}
                ></div>
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-center px-4 py-4 mx-96 bg-white/80">
                  <h1 className="text-md md:text-2xl font-semibold text-[#E10101]">Home &gt;&gt;&gt; About</h1>
                </div>
              
            </div>
        </div>
    );
};

export default AboutBanner;