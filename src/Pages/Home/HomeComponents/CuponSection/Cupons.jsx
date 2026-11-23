import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  HiTicket,
  HiCheck,
  HiClipboardDocument,
  HiArrowRight,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useCupon from "../../../../Hooks/useCupon";
import Image1 from "../../../../assets/cupon/discountbg.jpg";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";

const CuponDiscount = () => {
  const { allcupons, cuponloading } = useCupon();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="max-w-7xl mb-28 mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader subtitle="Exclusive Deals" title="Discount Coupons" />

      <div className="mt-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          {cuponloading ? (
            <div className="flex flex-col justify-center items-center h-72 bg-slate-900 rounded-3xl gap-3">
              <span className="loading loading-spinner text-error loading-lg"></span>
              <p className="text-slate-400 text-sm animate-pulse">
                Loading active discounts...
              </p>
            </div>
          ) : (
            allcupons?.map((cupon) => (
              <SwiperSlide key={`discount-coupons-${cupon._id}`}>
                <div className="relative min-h-[420px] md:min-h-[460px] flex items-center overflow-hidden rounded-3xl bg-slate-950">
                  {/* Background Image with Ambient Dark Blur */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-35"
                    src={Image1}
                    alt="Discount banner background"
                  />

                  {/* Gradient Layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  {/* Content Box */}
                  <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-left">
                      {/* Pill Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
                        {/* <RiDiscountPercentFill className="text-red-400 text-base" /> */}
                        <span>Limited Time Offer</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Get{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                          {cupon?.amount}% OFF
                        </span>{" "}
                        Your Order
                      </h2>

                      <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 md:line-clamp-none">
                        {cupon?.description ||
                          "Unlock top-tier discounts across all premium tech gadgets and gear."}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          to="/dashboard/profile"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
                        >
                          <span>Subscribe Now</span>
                          <HiArrowRight className="text-base" />
                        </Link>
                      </div>
                    </div>

                    {/* Interactive Voucher Card Ticket */}
                    <div className="w-full md:w-auto flex flex-col items-center justify-center">
                      <div className="w-full max-w-xs p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-widest">
                          <HiTicket className="text-lg" />
                          <span>Coupon Code</span>
                        </div>

                        <div className="p-3 bg-black/40 border border-dashed border-red-400/60 rounded-xl text-xl sm:text-2xl font-black text-white tracking-widest select-all">
                          {cupon?.cupon}
                        </div>

                        <button
                          onClick={() => handleCopy(cupon?.cupon)}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600/80 hover:bg-red-600 transition-colors duration-200 shadow"
                        >
                          {copiedCode === cupon?.cupon ? (
                            <>
                              <HiCheck className="text-base text-emerald-300" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <HiClipboardDocument className="text-base" />
                              <span>Click to Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default CuponDiscount;
