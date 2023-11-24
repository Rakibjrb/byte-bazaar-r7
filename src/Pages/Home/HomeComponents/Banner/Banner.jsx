import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../../assets/banner/bg1.jpg";
import image2 from "../../../../assets/banner/bg2.jpg";
import image3 from "../../../../assets/banner/bg3.jpg";
import "./banner.css";

const Banner = () => {
  return (
    <div className="mt-8 lg:-mt-20">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="xl:h-[820px] relative">
          <img src={image1} />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div>
              <h1 className="text-3xl md:text-4xl xl:text-6xl w-3/4 mx-auto text-white font-bold">
                Unleash the Power of Tomorrow’s Tech Today!
              </h1>
              <h3 className="text-white px-8 md:px-0 md:text-2xl mt-6 md:w-3/4 lg:w-1/2 mx-auto">
                Explore the Latest in Tech Innovation with Byte {"Bazaar's"}
                <span className="text-red-500 font-bold">
                  {" "}
                  Exclusive Collection
                </span>
              </h3>
            </div>
          </div>
        </div>
        <div className="xl:h-[820px] relative">
          <img src={image2} />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div>
              <h1 className="text-2xl md:text-4xl xl:text-6xl w-4/5 mx-auto text-white font-bold">
                Byte Bazaar’s Gadget Galaxy Explore, Shop, Enjoy
              </h1>
              <h3 className="text-white px-8 md:px-0 md:text-2xl mt-6 md:w-3/4 lg:w-1/2 mx-auto">
                Elevate Your Digital Lifestyle with Tech That Transcends
                <span className="text-red-500 font-bold"> Boundaries</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="xl:h-[820px] relative">
          <img src={image3} />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div>
              <h1 className="text-2xl md:text-4xl xl:text-6xl w-4/5 mx-auto text-white font-bold">
                Where Passion for Tech Unleashes a World of Endless
                Possibilities
              </h1>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
