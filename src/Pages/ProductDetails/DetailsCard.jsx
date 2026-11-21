import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { MdHowToVote } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { HiFlag, HiTag, HiCalendarDays, HiCheckBadge } from "react-icons/hi2";
import toast from "react-hot-toast";
import useVote from "../../Hooks/useVote";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DetailsCard = ({ product, refetch }) => {
  const url = useLocation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { _id, name, owner, img, description, tags, votes, time } = product;
  const { handleVote, voted } = useVote(_id, votes);

  const productId = url?.pathname.slice(9);
  const { data: votedproduct } = useQuery({
    queryKey: ["getallvotesfromdb", productId, user?.email],
    queryFn: async () => {
      if (!user?.email || !productId) return null;
      const res = await axiosSecure.get(
        `/vote?email=${user?.email}&productId=${productId}`
      );
      return res.data;
    },
  });

  const matchedproductuseremail = votedproduct?.useremail;
  const matchedproductId = votedproduct?.productId;
  const matched =
    matchedproductId === _id && matchedproductuseremail === user?.email;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  const handleReport = async () => {
    if (!user) {
      toast.error("Please log in to report this product");
      return;
    }

    const confirm = await Swal.fire({
      title: "Report Product?",
      text: "Are you sure you want to flag this item for moderator review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, report it",
    });

    if (confirm.isConfirmed) {
      const data = {
        productId: _id,
        name,
        img,
        owner,
        reportedUser: {
          name: user.displayName,
          email: user.email,
        },
      };
      const res = await axiosSecure.post("/report", data);
      if (res.data._id) {
        Swal.fire({
          icon: "success",
          title: "Report Submitted",
          text: "Moderators have been notified.",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
      {/* Creator Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-neutral-900 px-6 py-4 flex items-center justify-between text-white border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
              src={owner?.image || "https://i.ibb.co/5x441PC/user.png"}
              alt={owner?.name || "Product Owner"}
            />
            <HiCheckBadge className="text-red-500 absolute -bottom-1 -right-1 text-base bg-slate-900 rounded-full" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">
              {owner?.name || "Byte Creator"}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <HiCalendarDays className="text-slate-400" />
              <span>{time || "Recently Launched"}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleShare}
          title="Share Product"
          className="p-2.5 rounded-xl bg-white/10 hover:bg-red-600 text-white transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Share product"
        >
          <IoShareSocial className="text-xl" />
        </button>
      </div>

      {/* Hero Image Showcase */}
      <div className="relative overflow-hidden w-full h-72 sm:h-96 lg:h-[440px] bg-slate-950">
        <img
          className="w-full h-full object-contain sm:object-cover"
          src={img || ""}
          alt={name || "Product Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-lg">
            Hardware Spotlight
          </span>
          <div className="px-3.5 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-black shadow-lg">
            {votes || 0} Upvotes
          </div>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {name}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {description || "No description provided for this gadget."}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <HiTag className="text-red-500 text-xs" />
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons: Vote & Report */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
          <button
            disabled={voted || matched}
            onClick={async () => {
              await handleVote();
              refetch();
            }}
            className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-base font-bold transition-all duration-200 ${
              voted || matched
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.01] active:scale-95"
            }`}
          >
            <MdHowToVote className="text-2xl" />
            <span>{voted || matched ? "Already Upvoted" : "Upvote Device"}</span>
            <span className="ml-1 px-2.5 py-0.5 rounded-lg bg-black/20 text-white text-xs font-black">
              {votes || 0}
            </span>
          </button>

          <button
            onClick={handleReport}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border border-slate-300 text-slate-600 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 text-sm font-semibold transition-all duration-200 active:scale-95"
          >
            <HiFlag className="text-base text-rose-500" />
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  product: PropTypes.object,
  refetch: PropTypes.func,
};

export default DetailsCard;
