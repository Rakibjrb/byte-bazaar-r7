import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdHowToVote } from "react-icons/md";
import { HiSparkles, HiArrowUpRight } from "react-icons/hi2";
import useVote from "../../Hooks/useVote";

const Trending = ({ product, votedproduct }) => {
  const [disable, setDisable] = useState(false);
  const { _id, name, img, category, votes } = product;
  const { handleVote } = useVote(_id, votes);

  const alreadyvoted = votedproduct?.find((vote) => vote?.productId === _id);
  const votedtrue = alreadyvoted?.productId === _id;

  return (
    <div className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image & Badges */}
      <div className="relative overflow-hidden h-52 w-full bg-slate-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={img}
          alt={name}
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-950/80 backdrop-blur-md text-white border border-white/10 shadow">
            <HiSparkles className="text-amber-400 text-xs" />
            {category || "Tech"}
          </span>
        </div>
      </div>

      {/* Body details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <Link
            to={`/product/${_id}`}
            className="flex items-start justify-between gap-2 group/link"
          >
            <h2 className="text-lg font-bold text-slate-900 group-hover/link:text-red-600 transition-colors line-clamp-1">
              {name}
            </h2>
            <HiArrowUpRight className="text-slate-400 group-hover/link:text-red-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all text-base flex-shrink-0 mt-1" />
          </Link>
        </div>

        {/* Voting & Actions Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-400">
            Community Interest
          </span>

          <button
            disabled={disable || votedtrue}
            onClick={() => {
              handleVote();
              setDisable(true);
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              disable || votedtrue
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-red-500/20 active:scale-95"
            }`}
          >
            <MdHowToVote className="text-base" />
            <span>{votedtrue ? "Upvoted" : "Upvote"}</span>
            <span className="ml-1 px-1.5 py-0.5 rounded bg-white/70 text-slate-800 text-[11px] font-black">
              {votes || 0}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

Trending.propTypes = {
  product: PropTypes.object,
  votedproduct: PropTypes.array,
};

export default Trending;
