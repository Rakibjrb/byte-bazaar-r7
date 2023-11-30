import CommonHelmet from "../../Components/Common/Helmet";
import AboutUs from "./HomeComponents/AboutUs/AboutUs";
import Banner from "./HomeComponents/Banner/Banner";
import CuponDiscount from "./HomeComponents/CuponSection/Cupons";
import Featured from "./HomeComponents/Featured/Featured";
import Trending from "./HomeComponents/Trending/Trending";

const Home = () => {
  return (
    <div>
      <div className="mb-24">
        <Banner />
      </div>
      <div className="max-w-7xl mx-auto px-3 xl:px-0">
        <Featured />
        <AboutUs />
        <Trending />
        <CuponDiscount />
      </div>
      <CommonHelmet titlename={"Home"} />
    </div>
  );
};

export default Home;
