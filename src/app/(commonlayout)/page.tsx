import AnotherStatic from "./component/pages/home/AnotherStatic";
import Banner from "./component/pages/home/Banner";
import ContactUs from "./component/pages/home/ContactUs";
// import HomeCarosel from "./component/pages/home/HomeCarosel";
import HomeCategory from "./component/pages/home/HomeCategory";
import SomeRecipe from "./component/pages/home/SomeRecipe";
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
       <ContactUs/>
    </div>
    );
};

export default Home;
