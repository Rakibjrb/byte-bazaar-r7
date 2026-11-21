import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import { HiChatBubbleBottomCenterText, HiStar } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ProductReviews = ({ id }) => {
  const axios = useAxiosSecure();

  const { data: reviews = [], isPending: loadingReviews } = useQuery({
    queryKey: ["getReviews", id],
    queryFn: async () => {
      const res = await axios.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, curr) => acc + Number(curr.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center text-xl">
            <HiChatBubbleBottomCenterText />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Community Reviews
            </h3>
            <p className="text-xs text-slate-400">
              Honest feedback from verified gadget testers
            </p>
          </div>
        </div>

        {avgRating && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold">
            <HiStar className="text-amber-500 text-base" />
            <span>{avgRating} / 5.0</span>
            <span className="text-xs text-amber-600/70 font-normal">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {loadingReviews ? (
        <div className="flex flex-col justify-center items-center h-52 gap-2">
          <span className="loading loading-spinner text-error loading-lg"></span>
          <p className="text-xs text-slate-400 animate-pulse">Loading feedback...</p>
        </div>
      ) : reviews?.length === 0 ? (
        <div className="py-14 text-center space-y-2">
          <p className="text-lg font-bold text-slate-800">No reviews posted yet</p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Be the first verified enthusiast to drop your thoughts on this device below!
          </p>
        </div>
      ) : (
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="pb-10 pt-4"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center text-center max-w-xl mx-auto px-6 py-6">
                <FaQuoteLeft className="text-3xl text-red-500/20 mb-3" />

                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed mb-6">
                  &ldquo;{review.testimonial}&rdquo;
                </p>

                <div className="mb-3">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={Number(review.rating) || 5}
                    readOnly
                  />
                </div>

                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full w-10 h-10 object-cover border-2 border-red-500/20"
                    src={review?.image || "https://i.ibb.co/5x441PC/user.png"}
                    alt={review.name || "Reviewer"}
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-900">
                      {review.name || "Anonymous Member"}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Verified Tester
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

ProductReviews.propTypes = {
  id: PropTypes.string,
};

export default ProductReviews;
