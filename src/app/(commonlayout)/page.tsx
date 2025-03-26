import AnotherStatic from "./component/pages/home/AnotherStatic";
import Banner from "./component/pages/home/Banner";
import ContactUs from "./component/pages/home/ContactUs";
// import HomeCarosel from "./component/pages/home/HomeCarosel";
import HomeCategory from "./component/pages/home/HomeCategory";
import SomeRecipe from "./component/pages/home/SomeRecipe";
import Sponser from "./component/pages/home/Sponser";
import StaticHomeSection from "./component/pages/home/StaticHomeSection";

const Home = () => {
    return (
        <div className="mx-auto container">
       <Banner/>
       {/* <HomeCarosel/> */}

       <HomeCategory/>
       <AnotherStatic/>
       <SomeRecipe/>
       <StaticHomeSection/>
       <Sponser/>
       <ContactUs/>
    </div>
    );
};

export default Home;
