import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import DetailsCard from "./DetailsCard";
import ProductReviews from "./ProductReviews";
import PostReviews from "./PostReviews";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ProductsDetails = () => {
  const id = useParams().id;
  const axiosSecure = useAxiosSecure();
  const {
    data: product = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${id}`);
      return res.data;
    },
  });

  return (
    <div className="px-3 md:px-0 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mt-10 mb-24">
      <SectionHeader
        subtitle={`--Details of--`}
        title={product?.name || "No name"}
      />
      {isPending ? (
        <div className="flex justify-center items-center h-[200px]">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <DetailsCard product={product} refetch={refetch} />
          </div>
          <div className="mt-20">
            <ProductReviews id={id} />
          </div>
          <PostReviews
            id={id}
            productName={product?.name || "No name"}
            refetch={refetch}
          />
        </>
      )}
    </div>
  );
};

export default ProductsDetails;
