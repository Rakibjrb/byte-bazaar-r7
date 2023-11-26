import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../Components/ProductCard/Card";
import { useEffect, useState } from "react";
import NotFound from "../../Components/Common/NotFound";
import useGetAllVotes from "../../Hooks/useGetAllVotes";

const Products = () => {
  const axios = useAxiosPublic();
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { votedproduct } = useGetAllVotes();

  const { data, isPending } = useQuery({
    queryKey: ["all_products", searchText],
    queryFn: async () => {
      const res = await axios.get(`/product/all?search=${searchText}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchedText = e.target.searched.value;
    setSearchText(searchedText);
  };

  useEffect(() => {
    setAllProducts(data);
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-3 xl:px-0 mt-16 mb-24">
      <SectionHeader subtitle={"--All Products--"} title={"Our All Products"} />
      <div className="flex justify-center mt-10 mb-8">
        <form onSubmit={handleSearch} className="max-w-2xl flex">
          <input
            type="text"
            placeholder="Type here"
            name="searched"
            className="rounded-r-none focus:outline-none input-bordered input px-3 w-full placeholder:text-black"
            required
          />
          <button className="btn rounded-l-none bg-red-500 uppercase -ml-1 text-white font-semibold">
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isPending
          ? "loading data ..."
          : allProducts?.map((product) => (
              <Card
                key={product._id}
                product={product}
                votedproduct={votedproduct}
              />
            ))}
      </div>
      <div className={`${allProducts?.length ? "hidden" : ""}`}>
        <NotFound />
      </div>
    </div>
  );
};

export default Products;
