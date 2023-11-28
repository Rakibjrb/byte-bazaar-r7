import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../Components/ProductCard/Card";
import NotFound from "../../Components/Common/NotFound";
import useGetAllVotes from "../../Hooks/useGetAllVotes";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { votedproduct } = useGetAllVotes();

  let count = 0;
  const axios = useAxiosPublic();
  const { data: totalproducts = 1 } = useQuery({
    queryKey: ["documentcount"],
    queryFn: async () => {
      const res = await axios.get("/document-count");
      return res.data.totalDocuments;
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ["all_products", searchText],
    queryFn: async () => {
      const res = await axios.get(`/product/all?search=${searchText}`);
      return res.data;
    },
  });

  const perpage = 8;

  const { data: paginationdata } = useQuery({
    queryKey: ["paginationproducts", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `/pagination?skip=${currentPage * 5}&limit=${perpage}`
      );
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchedText = e.target.searched.value;
    setSearchText(searchedText);
  };

  const pagescreate = Math.ceil(totalproducts / perpage);
  const pages = [...Array(pagescreate).keys()];

  useEffect(() => {
    setAllProducts(data);
  }, [data]);

  useEffect(() => {
    setAllProducts(paginationdata);
  }, [paginationdata]);

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
        {isPending ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          allProducts?.map((product) => (
            <Card
              key={`${product?._id}${count++}`}
              product={product}
              votedproduct={votedproduct}
            />
          ))
        )}
      </div>

      <div className="mt-8 max-w-3xl mx-auto flex justify-center flex-wrap space-x-2 px-3 xl:px-0">
        <button
          disabled={currentPage === 0}
          className="btn btn-sm"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Prev
        </button>
        {pages?.map((page) => (
          <button
            key={`paginationbtn${page}`}
            className={`${currentPage === page && "bg-red-400"} btn btn-sm`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === pages?.length - 1}
          className="btn btn-sm"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>

      <div className={`${allProducts?.length ? "hidden" : ""}`}>
        <NotFound />
      </div>
    </div>
  );
};

export default Products;
