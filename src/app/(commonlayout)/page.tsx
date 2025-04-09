import Link from "next/link";
// import AnotherStatic from "./component/pages/home/AnotherStatic";
import Banner from "./component/pages/home/Banner";
import ContactUs from "./component/pages/home/ContactUs";
import EasyMeal from "./component/pages/home/EasyMeal";
// import HomeCarosel from "./component/pages/home/HomeCarosel";
// import HomeCategory from "./component/pages/home/HomeCategory";
import IconSection from "./component/pages/home/IconSection";
import MoreImage from "./component/pages/home/MoreImage";
import SomeRecipe from "./component/pages/home/SomeRecipe";
import Sponser from "./component/pages/home/Sponser";
import StaticHomeSection from "./component/pages/home/StaticHomeSection";

const Home = () => {
    return (
        <div className="mx-auto container">
            <Banner />
            {/* <HomeCarosel/> */}
            <IconSection />
            {/* <AnotherStatic /> */}
            {/* <HomeCategory /> */}
            <div>
                <Link href="/recipe">
                    <h1 className="text-3xl md:text-5xl md:my-14 font-serif text-center font-semibold" >
                        Check all the <span className="underline underline-offset-2 text-[#E10101] ">Recipes</span>
                    </h1>
                </Link>
                <SomeRecipe />
            </div>
            <EasyMeal />
            <StaticHomeSection />
            <Sponser />
            <ContactUs />
            <MoreImage />
        </div>
    );
};

export default Home;
