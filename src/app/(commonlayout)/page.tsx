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
import SharedTitle from "./component/pages/shared/SharedTitle";

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
                    <SharedTitle title="Check Out our" subtitle="All Recipes"/>
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
