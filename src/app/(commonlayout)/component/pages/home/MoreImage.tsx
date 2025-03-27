import Image from "next/image";
import i1 from "../../../../../../public/assets/anh/6.jpg";
import i2 from "../../../../../../public/assets/anh/5.jpg";
import i3 from "../../../../../../public/assets/anh/4.jpg";
import i4 from "../../../../../../public/assets/anh/3.jpg";
import i5 from "../../../../../../public/assets/anh/2.jpg";
import i6 from "../../../../../../public/assets/anh/1.jpg";

const MoreImage = () => {
    const data = [
        { id: 1,   image: i1 },
        { id: 2,  image: i2},
        { id: 3,   image: i3 },
        { id: 4,   image:  i4},
        { id: 5,   image:  i5},
        { id: 6,   image:  i6}
      ]
    return (
        <div className="my-20">
            <h1 className="text-center font-serif text-xl md:text-5xl ">Share Your Meals on <span className="underline underline-offset-2 bg-gradient-to-l from-[#E10101] to-[#790d0d] bg-clip-text text-transparent font-semibold ">  Recipe Hunt</span> </h1>
              <div className="flex justify-center items-center my-4 md:my-10">
               {data.map((item) => (
                      <div
                        key={item.id}
                        className="  hover:scale-105 transition duration-300"
                      >
                        <div className="">
                          <Image
                            src={item.image}
                            alt="image"
                            width={220} 
                            height={220} 
                            className=""
                          />
                        </div>
                        
                      </div>
                    ))}
        </div>
        </div>
      
    );
};

export default MoreImage;