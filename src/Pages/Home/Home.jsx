import Banner from "./HomeComponents/Banner/Banner";
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
        <Trending />
      </div>
    </div>
  );
};

export default Home;
