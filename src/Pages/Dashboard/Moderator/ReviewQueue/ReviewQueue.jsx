import CommonHelmet from "../../../../Components/Common/Helmet";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import useProducts from "../../../../Hooks/DashboardData/useProducts";
import QueueProducts from "./QueueProducts";

const ReviewQueue = () => {
  const { allPendingProducts, pendingRefetch } = useProducts();

  return (
    <div className="mt-8">
      <div className="md:mt-16">
        <div className="hidden md:block">
          <SectionHeader
            subtitle={"--Products Queue--"}
            title={"Review Products Queue"}
          />
        </div>
        <div className="md:hidden">
          <SectionHeader title={"Review Products Queue"} />
        </div>
        <div className="overflow-x-auto">
          <div className="md:w-auto mt-6">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-xl">SL No.</th>
                  <th className="text-xl">Name</th>
                  <th className="text-xl">Pending</th>
                  <th className="text-xl">Make Featured</th>
                  <th className="text-xl">Update</th>
                  <th className="text-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {allPendingProducts?.map((product, index) => (
                  <QueueProducts
                    key={product._id}
                    product={product}
                    index={index}
                    pendingRefetch={pendingRefetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CommonHelmet titlename={"Review Queue Products"} />
    </div>
  );
};

export default ReviewQueue;
