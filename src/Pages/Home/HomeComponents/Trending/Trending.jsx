import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import TrendingProduct from "../../../../Components/Trending/TrendingProduct";
import Button from "../../../../Components/Common/Button";
import useTrending from "../../../../Hooks/useTrending";

const Trending = () => {
  const [sort, setSort] = useState(false);
  const [trending, isPending] = useTrending(sort ? "desc" : "asc");

  return (
    <div className="mb-24">
      <SectionHeader subtitle="--trending--" title="Trending Products" />
      <div className="flex justify-center  mt-5">
        <Button>
          <button
            onClick={() => {
              setSort(!sort);
            }}
          >
            Sort by votes
          </button>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {isPending
          ? "loading data ..."
          : trending?.map((product) => (
              <TrendingProduct key={product._id} product={product} />
            ))}
      </div>
      <div className="flex justify-center mt-10">
        <Link to="/products">
          <Button>
            <button className="p-1 px-5 uppercase">Show All Products</button>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Trending;
