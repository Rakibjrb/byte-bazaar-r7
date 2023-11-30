import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Product from "./Product";
import CommonHelmet from "../../../../Components/Common/Helmet";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: ownerProducts, refetch } = useQuery({
    queryKey: ["getdataforuser"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/product/all?search=null&email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="md:mt-16">
      <div className="hidden md:block">
        <SectionHeader subtitle={"--My Products--"} title={"My All Products"} />
      </div>
      <div className="md:hidden">
        <SectionHeader title={"My All Products"} />
      </div>
      <div className="overflow-x-auto">
        <div className="md:w-auto mt-6">
          <table className="table">
            <thead>
              <tr>
                <th className="text-xl">SL No.</th>
                <th className="text-xl">Name</th>
                <th className="text-xl">Votes</th>
                <th className="text-xl">Status</th>
                <th className="text-xl">Update</th>
                <th className="text-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {ownerProducts?.map((product, index) => (
                <Product
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
      <CommonHelmet titlename={"My Products"} />
    </div>
  );
};

export default MyProducts;
