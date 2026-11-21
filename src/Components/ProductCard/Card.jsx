import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdHowToVote } from "react-icons/md";
import { HiCalendarDays, HiTag } from "react-icons/hi2";
import useVote from "../../Hooks/useVote";

const Card = ({ product, votedproduct }) => {
  const [disable, setDisable] = useState(false);
  const { _id, img, name, tags, votes, time } = product;
  const { handleVote } = useVote(_id, votes);

  const alreadyvoted = votedproduct?.find((vote) => vote?.productId === _id);
  const votedtrue = alreadyvoted?.productId === _id;

  return (
    <div className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden h-48 w-full bg-slate-100">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={img}
          alt={name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <Link to={`/product/${_id}`}>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          {/* Date Stamp */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
            <HiCalendarDays className="text-sm text-slate-400" />
            <span>{time}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                <HiTag className="text-[10px] text-red-500" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Upvote Button */}
        <div className="pt-3 border-t border-slate-100">
          <button
            disabled={disable || votedtrue}
            onClick={() => {
              handleVote();
              setDisable(true);
            }}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              disable || votedtrue
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-red-50 hover:bg-red-600 text-red-600 hover:text-white shadow-sm hover:shadow-red-500/20 active:scale-95"
            }`}
          >
            <MdHowToVote className="text-lg" />
            <span>{votedtrue ? "Upvoted" : "Upvote"}</span>
            <span className="ml-1 px-2 py-0.5 rounded-md bg-white/60 text-slate-800 text-xs font-bold">
              {votes || 0}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.object,
  votedproduct: PropTypes.array,
};

export default Card;
