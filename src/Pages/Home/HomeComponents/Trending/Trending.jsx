import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import TrendingProduct from "../../../../Components/Trending/TrendingProduct";
import useTrending from "../../../../Hooks/useTrending";
import useGetAllVotes from "../../../../Hooks/useGetAllVotes";
import { FaFire } from "react-icons/fa6";
import { HiArrowRight, HiArrowsUpDown } from "react-icons/hi2";

const Trending = () => {
  const [sort, setSort] = useState(false);
  const [trending, isPending] = useTrending(sort ? "desc" : "asc");
  const { votedproduct } = useGetAllVotes();

  return (
    <section className="mb-28 relative">
      <div className="flex flex-col justify-center gap-4 mb-8">
        <SectionHeader subtitle="Most Upvoted Today" title="Trending Gadgets" />

        <div className="flex justify-center pb-2">
          <button
            onClick={() => setSort(!sort)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              sort
                ? "bg-red-50 text-red-600 border-red-200 shadow-sm shadow-red-500/10"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            <FaFire
              className={
                sort
                  ? "text-red-500 text-base animate-bounce"
                  : "text-slate-400 text-base"
              }
            />
            <span>Sort by Votes</span>
            <HiArrowsUpDown className="ml-1 text-slate-400 text-xs" />
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="flex flex-col justify-center items-center h-64 gap-3">
          <span className="loading loading-spinner text-error loading-lg"></span>
          <p className="text-slate-500 text-sm animate-pulse">
            Loading trending gear...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending?.map((product) => (
            <TrendingProduct
              key={product._id}
              product={product}
              votedproduct={votedproduct}
            />
          ))}
        </div>
      )}

      {/* Show All Products Action CTA */}
      <div className="flex justify-center mt-12">
        <Link
          to="/products"
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-red-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-red-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          <span>Explore All Products</span>
          <HiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default Trending;
