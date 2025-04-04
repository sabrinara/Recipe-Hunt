import React from 'react';

const ExtraSection2 = () => {
    return (
        <div className="hidden md:flex ">
        <div
          className='relative w-full h-[30vh] rounded-md'
          style={{
              backgroundImage: `url('/assets/slide3.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
          }}
      >
          <div className="absolute top-1/2 left-1/3 right-1/3 transform -translate-y-1/2 flex flex-col items-center justify-center bg-white py-2">
              <h1 className='text-md font-semibold text-center text-[#E10101]'>Easy meal</h1>
              
          </div>
      </div>   
      </div>
    );
};

export default ExtraSection2;