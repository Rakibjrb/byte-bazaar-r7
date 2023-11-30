import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ProductReviews = ({ id }) => {
  const axios = useAxiosSecure();
  let count = 0;

  const { data: reviews = [], isPending: loadingReviews } = useQuery({
    queryKey: ["getReviews", id],
    queryFn: async () => {
      const res = await axios.get(`/reviews/${id}`);
      return res.data;
    },
  });

  return (
    <>
      <SectionHeader subtitle={"--Reivews--"} title={"Testimonials"} />

      {reviews?.length === 0 ? (
        <div className="h-[100px] flex justify-center mt-8">
          <h2 className="text-center text-2xl">
            No reviews yet, post a review now
          </h2>
        </div>
      ) : (
        ""
      )}

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {loadingReviews ? (
          <div className="flex justify-center items-center h-[200px]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <div>
            {reviews?.map((review) => (
              <SwiperSlide key={`id${count++}`}>
                <div className="flex flex-col items-center mx-8 my-16">
                  <img
                    className="rounded-full w-16 h-16"
                    src={review.image}
                    alt={review.name}
                  />
                  <h3 className="text-2xl text-red-400 my-5">{review.name}</h3>
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={review.rating || 1}
                    readOnly
                  />
                  <p className="py-8 text-justify">{review.testimonial}</p>
                </div>
              </SwiperSlide>
            ))}
          </div>
        )}
      </Swiper>
    </>
  );
};

ProductReviews.propTypes = {
  id: PropTypes.string,
};
export default ProductReviews;
