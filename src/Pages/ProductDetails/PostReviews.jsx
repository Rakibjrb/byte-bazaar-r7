import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ImSpinner3 } from "react-icons/im";
import { HiStar, HiPaperAirplane, HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PostReviews = ({ id, productName }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: "5",
    },
  });

  const mutation = useMutation({
    mutationKey: ["postReview", id],
    mutationFn: async (data) => {
      const res = await axiosSecure.post(`/reviews/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReviews", id] });
      Swal.fire({
        icon: "success",
        title: "Review Published!",
        text: "Thank you for sharing your experience with the community.",
        confirmButtonColor: "#ef4444",
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong while posting your review.",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  const onSubmit = async (review) => {
    if (!user) {
      Swal.fire("Authentication required", "Please login to review.", "warning");
      return;
    }

    const reviewData = {
      productId: id,
      name: user.displayName || "Byte User",
      email: user.email,
      image: user.photoURL || "https://i.ibb.co/5x441PC/user.png",
      rating: Number(review.rating),
      testimonial: review.testimonial,
    };

    mutation.mutate(reviewData);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-lg mt-10">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider w-fit mb-3">
        <HiSparkles />
        <span>Community Feedback</span>
      </div>

      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
        Drop Your Review
      </h3>
      <p className="text-slate-500 text-sm mt-1">
        Sharing feedback for <strong className="text-slate-800">{productName}</strong>
      </p>

      {!user ? (
        <div className="mt-8 p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
          <p className="text-slate-600 text-sm font-medium">
            You must be logged in to share your thoughts and rate this product.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            Log in to Review
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Rating Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Product Rating
            </label>
            <div className="flex items-center gap-3">
              <select
                {...register("rating", { required: true })}
                className="select select-bordered rounded-xl text-sm font-semibold bg-slate-50 border-slate-200 focus:border-red-500 focus:outline-none w-full max-w-xs"
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value="3">⭐⭐⭐ (3 - Average)</option>
                <option value="2">⭐⭐ (2 - Below Expectations)</option>
                <option value="1">⭐ (1 - Poor)</option>
              </select>
            </div>
          </div>

          {/* Testimonial Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Your Experience
            </label>
            <textarea
              {...register("testimonial", {
                required: "Review message cannot be empty",
                minLength: {
                  value: 10,
                  message: "Please write at least 10 characters",
                },
              })}
              placeholder="What did you love about this gadget? How was the build quality, performance, and everyday use?"
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-y min-h-[120px]"
              rows="4"
            ></textarea>
            {errors.testimonial && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {errors.testimonial.message}
              </p>
            )}
          </div>

          {/* User info badge */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <img
              src={user?.photoURL || "https://i.ibb.co/5x441PC/user.png"}
              alt="You"
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-800">Posting as: </span>
              <span className="text-slate-600">{user?.displayName || user?.email}</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.01] active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            {mutation.isPending ? (
              <>
                <ImSpinner3 className="text-lg animate-spin" />
                <span>Publishing Review...</span>
              </>
            ) : (
              <>
                <span>Submit Review</span>
                <HiPaperAirplane className="text-base" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

PostReviews.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
};

export default PostReviews;
