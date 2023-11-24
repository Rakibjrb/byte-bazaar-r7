import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import TrendingProduct from "../../../../Components/Trending/TrendingProduct";
import Button from "../../../../Components/Common/Button";

const Trending = () => {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("./products.json")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter(
          (product) => product.category === "trending"
        );
        setTrending(featured);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mb-24">
      <SectionHeader subtitle="--trending--" title="Trending Products" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {loading
          ? "loading data ..."
          : trending?.map((product) => (
              <TrendingProduct key={product.id} product={product} />
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
