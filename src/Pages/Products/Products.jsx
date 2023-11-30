import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "../../Components/ProductCard/Card";
import NotFound from "../../Components/Common/NotFound";
import useGetAllVotes from "../../Hooks/useGetAllVotes";
import CommonHelmet from "../../Components/Common/Helmet";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { votedproduct } = useGetAllVotes();
  const axios = useAxiosPublic();
  const { data: totalproducts = 1 } = useQuery({
    queryKey: ["documentcount-for-products-page"],
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
  const { data: topvotedproducts, isPending: topvotedPending } = useQuery({
    queryKey: ["topvotedforslider"],
    queryFn: async () => {
      const res = await axios.get(`/topvoted-forslider`);
      return res.data;
    },
  });

  const perpage = 20;

  const { data: paginationdata } = useQuery({
    queryKey: ["paginationproducts", currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `/pagination?skip=${currentPage * perpage}&limit=${perpage}`
      );
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchedText = e.target.searched.value;
    const text = searchedText.toLowerCase();
    setSearchText(text);
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
    <div className="max-w-7xl mx-auto px-3 xl:px-0 mt-8 mb-24">
      <SectionHeader subtitle={"--Top Voted--"} title={"Rising Products"} />
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {topvotedPending ? (
          <div className="flex justify-center items-center h-[200px]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          topvotedproducts?.map((mostVotedProduct) => (
            <SwiperSlide key={mostVotedProduct._id}>
              <div className="mt-6 mb-20 relative h-[300px] lg:h-[400px]">
                <img
                  className="w-full h-full rounded-lg"
                  src={mostVotedProduct?.img}
                  alt="banner image 1"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-[#00000065] rounded-lg">
                  <div className="w-full h-full flex justify-center items-center">
                    <div>
                      <h1 className="text-3xl md:text-5xl text-white font-bold">
                        {mostVotedProduct?.name}
                      </h1>
                      <h2 className="text-white my-3 text-2xl text-center font-semibold">
                        Total Votes : {mostVotedProduct?.votes}
                      </h2>
                      <Link
                        to={`/product/${mostVotedProduct?._id}`}
                        className="flex justify-center mt-3"
                      >
                        <button className="bg-red-600 uppercase py-2 px-6 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <SectionHeader subtitle={"--All Products--"} title={"Our All Products"} />
      <div className="flex justify-center my-10">
        <form onSubmit={handleSearch} className="max-w-2xl flex">
          <input
            type="text"
            placeholder="Search using tags"
            name="searched"
            className="rounded-r-none focus:outline-none input-bordered input px-3 w-full placeholder:text-black"
            required
          />
          <button className="btn rounded-l-none bg-red-500 uppercase -ml-1 text-white font-semibold">
            Search
          </button>
        </form>
      </div>
      {isPending ? (
        <div className="flex justify-center items-center h-[300px]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {allProducts?.map((product) => (
            <Card
              key={`${product?._id}incard${product?._id}`}
              product={product}
              votedproduct={votedproduct}
            />
          ))}
        </div>
      )}

      {allProducts?.length && (
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
      )}

      <div className={`${!allProducts?.length ? "" : "hidden"}`}>
        <NotFound />
      </div>
      <CommonHelmet titlename={"Products"} />
    </div>
  );
};

export default Products;
