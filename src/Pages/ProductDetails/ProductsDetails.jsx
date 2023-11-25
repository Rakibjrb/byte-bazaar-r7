import { useParams } from "react-router-dom";
import useProductById from "../../Hooks/useProductById";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import DetailsCard from "./DetailsCard";
import ProductReviews from "./ProductReviews";
import PostReviews from "./PostReviews";

const ProductsDetails = () => {
  const id = useParams().id;
  const { data: product, refetch } = useProductById(id);

  return (
    <div className="px-3 md:px-0 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mt-10 mb-24">
      <SectionHeader
        subtitle={`--Details of--`}
        title={product?.name || "No name"}
      />
      <div className="mt-8">
        <DetailsCard product={product} />
      </div>
      <div className="mt-20">
        <ProductReviews id={id} />
      </div>
      <PostReviews
        id={id}
        productName={product?.name || "No name"}
        refetch={refetch}
      />
    </div>
  );
};

export default ProductsDetails;
