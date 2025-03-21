import Banner from "./component/pages/home/Banner";
import ContactUs from "./component/pages/home/ContactUs";
// import HomeCarosel from "./component/pages/home/HomeCarosel";
import HomeCategory from "./component/pages/home/HomeCategory";
import SomeRecipe from "./component/pages/home/SomeRecipe";

const Home = () => {
    return (
        <div className="mx-auto container">
       <Banner/>
       {/* <HomeCarosel/> */}
       <HomeCategory/>
       <SomeRecipe/>
       <ContactUs/>
    </div>
    );
};

export default Home;
