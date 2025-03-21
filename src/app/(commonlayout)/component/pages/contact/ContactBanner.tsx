


const ContactBanner = () => {
    return (
        <div
        className="md:w-full relative h-[40vh] md:h-[80vh] m-2  md:mx-0 md:mb-10  md:mt-1"
      >
      <div className="absolute inset-0 rounded-4xl"
          style={{
            backgroundImage: `url('/assets/contactBanner.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border:"20px",
            borderRadius:"50px",
            
          }}> </div>
     
                 {/* Content */}
                 <div className="relative z-10  p-10 md:p-32 text-white">
                   <h1 className="font-semibold mb-2  italic text-3xl md:text-6xl drop-shadow-lg">
                    Choose from <br /> thousands of <br /> recipes 
                   </h1>
                   <h4 className="text-xl my-4 drop-shadow-md">
                   Appropriately integrate technically sound value with scalable infomediaries <br />negotiate sustainable strategic theme areas.
                   </h4>
                   
                 </div>
                 </div>
               
    );
};

export default ContactBanner;