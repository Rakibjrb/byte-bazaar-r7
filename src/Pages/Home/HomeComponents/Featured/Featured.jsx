import useFeatured from "../../../../Hooks/useFeatured";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import Card from "../../../../Components/ProductCard/Card";
import Button from "../../../../Components/Common/Button";

const Featured = () => {
  const [featured, isPending] = useFeatured();

  return (
    <div className="mb-24">
      <SectionHeader
        subtitle="--Featured--"
        title="Featured Products"
        btntext="Latest Products"
        hidden={false}
      />
      <div className="flex justify-center  mt-5">
        <Button>
          <button>View Latest</button>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
        {isPending
          ? "loadin data ..."
          : featured?.map((product) => (
              <Card key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default Featured;
