import { useState } from "react";
import useFeatured from "../../../../Hooks/useFeatured";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import Card from "../../../../Components/ProductCard/Card";
import useGetAllVotes from "../../../../Hooks/useGetAllVotes";
import { HiSparkles, HiArrowsUpDown } from "react-icons/hi2";
import { BsClockHistory } from "react-icons/bs";

const Featured = () => {
  const [sort, setSort] = useState(true);
  const [featured, isPending] = useFeatured(!sort ? "desc" : "asc");
  const { votedproduct } = useGetAllVotes();

  return (
    <section className="mb-28 relative">
      {/* Decorative background glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="flex flex-col justify-center gap-4 mb-8">
        <SectionHeader
          subtitle="Handpicked Hardware"
          title="Featured Products"
        />
        <div className="flex justify-center pb-2">
          <button
            onClick={() => setSort(!sort)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all duration-200 shadow-sm hover:shadow"
          >
            {sort ? (
              <>
                <HiSparkles className="text-red-500 text-base" />
                <span>
                  Showing: <strong className="text-slate-900">Latest</strong>
                </span>
              </>
            ) : (
              <>
                <BsClockHistory className="text-amber-500 text-base" />
                <span>
                  Showing: <strong className="text-slate-900">Oldest</strong>
                </span>
              </>
            )}
            <HiArrowsUpDown className="ml-1 text-slate-400 text-xs" />
          </button>
        </div>
      </div>

      {isPending ? (
        <div className="flex flex-col justify-center items-center h-64 gap-3">
          <span className="loading loading-spinner text-error loading-lg"></span>
          <p className="text-slate-500 text-sm animate-pulse">
            Loading featured products...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured?.map((product) => (
            <Card
              key={`featured-product-${product._id}`}
              product={product}
              votedproduct={votedproduct}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Featured;
