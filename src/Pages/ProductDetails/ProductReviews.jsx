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

  const { data: reviews = [] } = useQuery({
    queryKey: ["getReviews", id],
    queryFn: async () => {
      const res = await axios.get(`/reviews/${id}`);
      return res.data;
    },
  });

  return (
    <>
      <SectionHeader subtitle={"--Reivews--"} title={"Testimonials"} />

      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews?.reviews?.map((review) => (
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
        </Swiper>
      </div>
    </>
  );
};

ProductReviews.propTypes = {
  id: PropTypes.string,
};
export default ProductReviews;
