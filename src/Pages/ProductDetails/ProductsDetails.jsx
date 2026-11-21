import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import DetailsCard from "./DetailsCard";
import ProductReviews from "./ProductReviews";
import PostReviews from "./PostReviews";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import CommonHelmet from "../../Components/Common/Helmet";

const ProductsDetails = () => {
  const { id } = useParams();
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
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors group"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to all products</span>
          </Link>
        </div>

        <SectionHeader
          subtitle="Hardware Overview"
          title={product?.name || "Product Showcase"}
        />

        {isPending ? (
          <div className="flex flex-col justify-center items-center h-80 gap-3">
            <span className="loading loading-spinner text-error loading-lg"></span>
            <p className="text-slate-500 text-sm animate-pulse">
              Retrieving hardware specifications...
            </p>
          </div>
        ) : (
          <div className="space-y-12 mt-8">
            <DetailsCard product={product} refetch={refetch} />
            <ProductReviews id={id} />
            <PostReviews
              id={id}
              productName={product?.name || "this product"}
              refetch={refetch}
            />
          </div>
        )}
        <CommonHelmet titlename={product?.name ? `${product.name} - Byte Bazaar` : "Product Details"} />
      </div>
    </div>
  );
};

export default ProductsDetails;
