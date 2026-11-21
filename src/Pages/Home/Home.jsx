import CommonHelmet from "../../Components/Common/Helmet";
import AboutUs from "./HomeComponents/AboutUs/AboutUs";
import Banner from "./HomeComponents/Banner/Banner";
import CuponDiscount from "./HomeComponents/CuponSection/Cupons";
import Featured from "./HomeComponents/Featured/Featured";
import Trending from "./HomeComponents/Trending/Trending";
import TechCategories from "./HomeComponents/TechCategories/TechCategories";
import WhyChooseUs from "./HomeComponents/WhyChooseUs/WhyChooseUs";
import Newsletter from "./HomeComponents/Newsletter/Newsletter";

const Home = () => {
  return (
    <div>
      <div className="mb-20">
        <Banner />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">
        <TechCategories />
        <Featured />
        <WhyChooseUs />
        <Trending />
        <AboutUs />
        <CuponDiscount />
        <Newsletter />
      </div>
      <CommonHelmet titlename={"Home"} />
    </div>
  );
};

export default Home;
