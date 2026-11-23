import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { FaFire } from "react-icons/fa6";
import image1 from "../../../../assets/banner/bg1.jpg";
import image2 from "../../../../assets/banner/bg2.jpg";
import image3 from "../../../../assets/banner/bg3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./banner.css";

const slides = [
  {
    image: image1,
    tag: "Next-Gen Tech Arrival",
    tagIcon: HiSparkles,
    title: (
      <>
        Unleash the Power of{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300">
          Tomorrow’s Tech
        </span>{" "}
        Today!
      </>
    ),
    description:
      "Explore the latest in tech innovation with Byte Bazaar's exclusive collection of premium gear, high-performance gadgets, and smart devices.",
    primaryBtn: { text: "Explore Products", link: "/products" },
    secondaryBtn: { text: "View Featured", link: "#featured" },
    stats: [
      { label: "Verified Gadgets", value: "2.5K+" },
      { label: "Tech Enthusiasts", value: "50K+" },
      { label: "Customer Rating", value: "4.9/5" },
    ],
  },
  {
    image: image2,
    tag: "Curated Galaxy of Devices",
    tagIcon: FaFire,
    title: (
      <>
        Byte Bazaar’s Gadget Galaxy:{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-red-400 to-orange-400">
          Explore, Shop, Enjoy
        </span>
      </>
    ),
    description:
      "Elevate your digital lifestyle with tech that transcends boundaries. Discover top-rated productivity tools, accessories, and wearable marvels.",
    primaryBtn: { text: "Shop Trending", link: "/products" },
    secondaryBtn: { text: "Special Deals", link: "#trending" },
    stats: [
      { label: "Top Brands", value: "120+" },
      { label: "Fast Delivery", value: "99.8%" },
      { label: "Community Upvotes", value: "100K+" },
    ],
  },
  {
    image: image3,
    tag: "Limitless Possibilities",
    tagIcon: HiSparkles,
    title: (
      <>
        Where Passion for Tech Meets a World of{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-rose-300">
          Endless Possibilities
        </span>
      </>
    ),
    description:
      "Join the ultimate developer and creator marketplace. Share, vote, and get your hands on groundbreaking hardware designed for creators.",
    primaryBtn: { text: "Discover Now", link: "/products" },
    secondaryBtn: { text: "Join Community", link: "/dashboard" },
    stats: [
      { label: "Daily Launches", value: "30+" },
      { label: "Active Reviewers", value: "15K+" },
      { label: "Satisfaction", value: "99%" },
    ],
  },
];

const Banner = () => {
  return (
    <div className="relative overflow-hidden">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5500}
        showStatus={false}
        showThumbs={false}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/40 hover:bg-red-600/90 text-white backdrop-blur-md border border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg group hover:scale-110"
              aria-label="Previous slide"
            >
              <HiChevronLeft className="h-6 w-6 transform group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/40 hover:bg-red-600/90 text-white backdrop-blur-md border border-white/20 transition-all duration-300 flex items-center justify-center shadow-lg group hover:scale-110"
              aria-label="Next slide"
            >
              <HiChevronRight className="h-6 w-6 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <li
            key={index}
            className={`inline-block mx-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              isSelected
                ? "w-8 md:w-10 h-2.5 bg-red-600 shadow-md shadow-red-500/50"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
            }`}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          />
        )}
      >
        {slides.map((slide, idx) => {
          const TagIcon = slide.tagIcon;
          return (
            <div
              key={`hero-section-banner-${idx}`}
              className="relative min-h-[580px] md:min-h-[660px] lg:h-[760px] xl:h-[840px] w-full flex items-center"
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={`Banner Slide ${idx + 1}`}
                className="absolute w-full h-full top-0 left-0"
              />

              {/* Multi-layered Premium Gradients for Readability and Depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-transparent"></div>

              {/* Content Container */}
              <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 text-left">
                <div className="max-w-2xl lg:max-w-3xl">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 backdrop-blur-md text-red-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-5 animate-pulse">
                    <TagIcon className="text-red-400 text-base" />
                    <span>{slide.tag}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight sm:leading-snug md:leading-[1.15] tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-5 text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl drop-shadow">
                    {slide.description}
                  </p>

                  {/* Call To Actions */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                      to={slide.primaryBtn.link}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      <span>{slide.primaryBtn.text}</span>
                      <HiArrowRight className="text-lg" />
                    </Link>

                    <Link
                      to={slide.secondaryBtn.link}
                      className="inline-flex items-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base rounded-xl backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      {slide.secondaryBtn.text}
                    </Link>
                  </div>

                  {/* Stats / Highlights Pill Strip */}
                  <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
                    {slide.stats.map((stat, i) => (
                      <div key={i} className="text-left">
                        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
