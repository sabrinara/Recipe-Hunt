import Image from "next/image";
import Marquee from 'react-fast-marquee';
import i from "../../../../../../public/assets/sponsor/a.png";
import i2 from "../../../../../../public/assets/sponsor/b.png";
import i1 from "../../../../../../public/assets/sponsor/c.png";
import i3 from "../../../../../../public/assets/sponsor/d.png";
import i4 from "../../../../../../public/assets/sponsor/e.png";
import i5 from "../../../../../../public/assets/sponsor/f.png";
const Sponser = () => {
    const data = [
        { id: 1,   image: i },
        { id: 2,  image: i2},
        { id: 3,   image: i1 },
        { id: 4,   image:  i3},
        { id: 5,   image:  i4},
        { id: 6,   image:  i5}
      ]
    return (
        <div className="py-10 md:px-60">

      <Marquee gradient={false} speed={100}>
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center m-2 px-2 md:px-4 py-1 rounded-lg hover:scale-105 transition duration-300"
          >
            <div className="w-24 md:w-40 h-24 md:h-40 relative">
              <Image
                src={item.image}
                alt="image"
                width={200} 
                height={200} 
                className="rounded-md"
              />
            </div>
            
          </div>
        ))}
      </Marquee>
    </div>
    );
};

export default Sponser;