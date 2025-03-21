import Image from "next/image";
import Marquee from 'react-fast-marquee';
import meat from "../../../../../../public/assets/category/cat.png";
import egg from "../../../../../../public/assets/category/cat1.png";
import green from "../../../../../../public/assets/category/cat2.png";
import lunch from "../../../../../../public/assets/category/cat3.png";
import choclate from "../../../../../../public/assets/category/cat4.png";
import pizza from "../../../../../../public/assets/category/cat5.png";
import desserts from "../../../../../../public/assets/category/cat6.png";
import vegetables from "../../../../../../public/assets/category/cat7.png";

const HomeCategory = () => {
  const data = [
    { id: 1, name: "Meat", image: meat },
    { id: 2, name: "Egg", image: egg },
    { id: 3, name: "Green", image: green },
    { id: 4, name: "Choclate", image:  choclate},
    { id: 5, name: "Pizza", image: pizza },
    { id: 6, name: "Desserts", image: desserts },
    { id: 7, name: "Vegetables", image: vegetables }, 
    { id: 8, name: "Lunch", image: lunch }, 
  ];

  return (
    <div className="py-10">
      {/* <h2 className="text-center text-3xl font-bold mb-6 shadow-lg">Categories</h2> */}

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

export default HomeCategory;
