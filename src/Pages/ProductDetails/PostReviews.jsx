import { useMutation, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PostReviews = ({ id, productName, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationKey: [id],
    mutationFn: async (data) => {
      const muted = await axiosSecure.post(`/reviews/${id}`, data);
      return muted;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: reviews = [] } = useQuery({
    queryKey: ["getReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const onSubmit = async (review) => {
    const reviewData = {
      productId: id,
      name: user.displayName,
      image: user.photoURL,
      rating: review.rating,
      testimonial: review.testimonial,
    };

    await mutation.mutate(reviewData);
    Swal.fire("Thanks for share your review");
    refetch();
  };

  const disablePostBtn = reviews?.find(
    (review) => review.image === user.photoURL
  );

  return (
    <div className="mt-8">
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
          defaultValue={user.displayName}
          type="text"
          className="focus:outline-none input-bordered input px-3 w-full placeholder:text-black"
          disabled
        />
        <input
          defaultValue={user.photoURL}
          type="text"
          className="focus:outline-none input-bordered input px-3 w-full placeholder:text-black"
          disabled
        />
        {disablePostBtn ? (
          <button
            disabled
            className="text-center btn w-full col-span-2 bg-red-400 font-semibold text-white uppercase"
          >
            Already Reviewed
          </button>
        ) : (
          <button className="text-center btn w-full col-span-2 bg-red-400 font-semibold text-white uppercase">
            {mutation.isPending ? (
              <ImSpinner3 className="text-xl animate-spin" />
            ) : (
              "Post Now"
            )}
          </button>
        )}
      </form>
    </div>
  );
};

PostReviews.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
  refetch: PropTypes.func,
};
export default PostReviews;
