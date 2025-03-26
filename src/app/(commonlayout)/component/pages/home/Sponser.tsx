import Image from "next/image";
import Marquee from 'react-fast-marquee';
import i from "../../../../../../public/assets/icon/i.png";
import i2 from "../../../../../../public/assets/icon/i1.png";
import i1 from "../../../../../../public/assets/icon/i2.png";
import i3 from "../../../../../../public/assets/icon/i3.png";
const Sponser = () => {
    const data = [
        { id: 1, name: "Elementor plugin", des:"Build with an easy to use drag & drop page editor.", image: i },
        { id: 2, name: "WooCommerce",des:"Full compatibility with the free eCommerce plugin.", image: i2},
        { id: 3, name: "1-click import", des:"Get the full Recipe Hunt theme demo content with 1 click.", image: i1 },
        { id: 4, name: "Fully responsive", des:"Braise looks great on all device types & screen sizes.", image:  i3}
      ]
    return (
        <div className="py-10">

      <Marquee gradient={false} speed={100}>
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center m-2 shadow-lg px-8 py-4 rounded-lg hover:scale-105 transition duration-300"
          >
            <div className="w-24 h-24 relative">
              <Image
                src={item.image}
                alt={item.name}
                width={90} 
                height={90} 
                className="rounded-md"
              />
            </div>
            <p className="mt-3 font-serif font-bold text-lg text-[#E10101]">{item.name}</p>
          </div>
        ))}
      </Marquee>
    </div>
    );
};

export default Sponser;