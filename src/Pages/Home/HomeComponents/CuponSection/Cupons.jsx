import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import useCupon from "../../../../Hooks/useCupon";
import Image1 from "../../../../assets/cupon/discountbg.jpg";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";

const CuponDiscount = () => {
  const { allcupons, cuponloading } = useCupon();

  return (
    <div className="max-w-7xl mb-24 mx-auto px-3 xl:px-0">
      <SectionHeader subtitle={"--Cupons--"} title={"Discount Cupons"} />
      <div className="mt-8">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {cuponloading ? (
            <div className="flex justify-center items-center h-[200px]">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            allcupons?.map((cupon) => (
              <SwiperSlide key={cupon._id} className="">
                <div className="relative py-[130px] md:py-[30px] lg:py-0 lg:h-[400px]">
                  <img
                    className="w-full rounded-lg"
                    src={Image1}
                    alt="banner image 1"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#00000065] rounded-lg">
                    <div className="w-full h-full flex items-center">
                      <div className="text-white px-10">
                        <h2 className="text-xl text-center md:text-left md:text-5xl mb-2 md:mb-4">
                          Use this cupon
                        </h2>
                        <h1 className="text-3xl text-center w-[80%] md:w-full mx-auto md:mx-0 md:text-left md:text-6xl">
                          {cupon?.cupon}
                          <span className="text-red-500 font-extrabold">
                            {" "}
                            Get {cupon?.amount}% off
                          </span>
                        </h1>
                        <p className="text-xl text-center md:text-left md:w-3/5 mt-2">
                          {cupon?.description}
                        </p>
                        <div className="flex justify-center md:justify-start">
                          <Link
                            to="/dashboard/profile"
                            className="btn bg-red-500 text-white hover:text-black mt-5"
                          >
                            Subscribe Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default CuponDiscount;
