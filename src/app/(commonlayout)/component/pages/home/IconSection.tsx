import Image from "next/image";
import i from "../../../../../../public/assets/icon/i.png";
import i2 from "../../../../../../public/assets/icon/i1.png";
import i1 from "../../../../../../public/assets/icon/i2.png";
import i3 from "../../../../../../public/assets/icon/i3.png";
const IconSection = () => {
    const data = [
    { id: 1, name: "Homemade Sweet", des: "Delicious homemade treats with a touch of love.", image: i },
    { id: 2, name: "Quick Meal", des: "Easy and fast meals for busy days.", image: i2 },
    { id: 3, name: "Tasty Snacks", des: "Crunchy and flavorful bites for any time.", image: i1 },
    { id: 4, name: "Healthy Meal", des: "Nutritious and balanced meals for a healthy lifestyle.", image: i3 }
];

    return (
        <div className="flex justify-center md:py-14">

        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center m-2 shadow-lg px-8 py-4 rounded-lg hover:scale-105 transition duration-300"
          >
            <div className="w-28 h-28 relative">
              <Image
                src={item.image}
                alt={item.name}
                width={100} 
                height={100} 
                className="rounded-md"
              />
            </div>
            <h1 className="mt-2 font-serif font-bold text-lg ">{item.name}</h1>
            <p className="mt-2  text-md text-center">{item.des}</p>
            
          </div>
        ))}
    </div>
    );
};

export default IconSection;