import { useState } from "react";
import useFeatured from "../../../../Hooks/useFeatured";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import Card from "../../../../Components/ProductCard/Card";
import Button from "../../../../Components/Common/Button";
import useGetAllVotes from "../../../../Hooks/useGetAllVotes";

const Featured = () => {
  const [sort, setSort] = useState(false);
  const [featured, isPending] = useFeatured(!sort ? "asc" : "desc");
  const { votedproduct } = useGetAllVotes();

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
          <button
            onClick={() => {
              setSort(!sort);
            }}
          >
            {sort ? "View Latest" : "View old"}
          </button>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10">
        {isPending
          ? "loadin data ..."
          : featured?.map((product) => (
              <Card
                key={product._id}
                product={product}
                votedproduct={votedproduct}
              />
            ))}
      </div>
    </div>
  );
};

export default Featured;
