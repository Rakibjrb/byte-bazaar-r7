import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const PostReviews = ({ id, productName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (review) => {
    console.log(id);
    console.log(review);
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-2">Post a Review now for</h2>
      <h3 className="text-xl">{productName}</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-xl mx-auto mt-10"
      >
        <textarea
          {...register("testimonial", { required: true })}
          placeholder="Write your review here"
          className="p-3 focus:outline-none border-2 rounded-lg"
          rows="5"
        ></textarea>
        <p
          className={`text-red-500 mt-2 ${errors.testimonial ? "" : "hidden"}`}
        >
          {errors.testimonial && "This is field required"}
        </p>
        <p>Select Rating : </p>
        <select
          {...register("rating", { required: true })}
          className="border-2 rounded-lg p-3"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input
          type="text"
          placeholder="name"
          {...register("name")}
          className="focus:outline-none input-bordered input px-3 w-full placeholder:text-black"
          disabled
        />
        <input
          type="text"
          placeholder="image"
          {...register("image")}
          className="focus:outline-none input-bordered input px-3 w-full placeholder:text-black"
          disabled
        />
        <button className="text-center btn w-full col-span-2 bg-red-400 font-semibold text-white uppercase">
          Post Now
        </button>
      </form>
    </div>
  );
};

PostReviews.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
};
export default PostReviews;
