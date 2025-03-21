import React from 'react';
// import Image from 'next/image';

const ContactUs = () => {
    return (
        <div>
              <div
                            className='relative w-full h-[52vh] md:h-[80vh] rounded-md mb-10 md:mb-20'
                            style={{
                                backgroundImage: `url('/assets/contactus.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                
                            }}
                        >
                            <div className="absolute top-1/2 left-20 md:left-10 md:right-[80vh] transform -translate-y-1/2 flex flex-col items-center justify-center  my-4">
                               <div>
                                   <h1 className='text-3xl md:text-5xl font-bold  mb-2 md:mb-4 text-center md:text-start text-white italic '>Contact <span className='text-red-700'>Us</span></h1>
                                   <p className='font-thin text-white  mb-2 md:mb-6 italic text-center md:text-start'>Share Food & Spend Happiness</p>
                                   <form action="" className=''>
                                       <div className="flex flex-col md:flex-row gap-4">
                                       <div className="form-control w-full max-w-xs">
                                           <label className="label">
                                               <span className="label-text text-white font-thin mb-2">Name</span>
                                           </label>
                                           <input type="name" placeholder="Type here" className="px-4 py-2 border border-gray-300 rounded-sm w-full max-w-xs bg-transparent" />
                                       </div>
                                       <div className="form-control w-full max-w-xs">
                                           <label className="label">
                                               <span className="label-text text-white font-thin mb-2">Email</span>
                                           </label>
                                           <input type="email" placeholder="Type here" className="px-4 py-2 border border-gray-300 rounded-sm w-full max-w-xs bg-transparent" />
                                       </div>
                                     
                                       </div>
                                       <div className="form-control w-full max-w-xs mt-6">
                                           <label className="label">
                                               <span className="label-text text-white font-thin mb-2">Message</span>
                                           </label>
                                           <textarea placeholder="Type here" className="px-4 py-2 border border-gray-300 rounded-sm w-full max-w-xs bg-transparent" />
                                       </div>
                                       <button className=" w-full  bg-[#E10101] text-white px-4 py-2 rounded-md mt-4 mb-10 md:mb-0">Submit</button>
                                   </form>
                               </div>
                            </div>
                        </div>
        </div>
    );
};

export default ContactUs;
