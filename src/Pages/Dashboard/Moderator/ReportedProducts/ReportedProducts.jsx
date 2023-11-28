import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import Reported from "./Reported";

const ReportedProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: allreporteddata, refetch } = useQuery({
    queryKey: ["allrepored-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-reported-product/${user?.email}`);
      return res.data;
    },
  });

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
                  <th className="text-xl">Details</th>
                  <th className="text-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {allreporteddata?.map((product, index) => (
                  <Reported
                    key={product._id}
                    product={product}
                    index={index}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedProducts;
