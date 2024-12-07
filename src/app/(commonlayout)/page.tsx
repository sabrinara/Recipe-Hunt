
import Banner from "./component/pages/home/Banner";
import ContactUs from "./component/pages/home/ContactUs";
import HomeCarosel from "./component/pages/home/HomeCarosel";
import SomeRecipe from "./component/pages/home/SomeRecipe";
import UserInfo from "./component/pages/shared/UserInfo";




const Home = () => {
   
    return (
        <div className="mx-auto container">
            <UserInfo/>
         
       <Banner/>
       <HomeCarosel/>
       <SomeRecipe/>
       <ContactUs/>
    </div>
    );
};

export default Home;
