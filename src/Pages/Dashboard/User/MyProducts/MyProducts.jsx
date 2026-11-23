import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Product from "./Product";
import CommonHelmet from "../../../../Components/Common/Helmet";
import { Link } from "react-router-dom";
import { HiPlusCircle, HiSquare3Stack3D } from "react-icons/hi2";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: ownerProducts = [], isPending, refetch } = useQuery({
    queryKey: ["getdataforuser", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/product/all?search=null&email=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-950 border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center text-2xl">
            <HiSquare3Stack3D />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              My Published Products
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage your hardware listings, live votes, and approval status
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/add-product"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
        >
          <HiPlusCircle className="text-lg" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Products Table Card */}
      <div className="rounded-3xl bg-slate-950 border border-white/10 shadow-xl overflow-hidden">
        {isPending ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2">
            <span className="loading loading-spinner text-error loading-lg"></span>
            <p className="text-xs text-slate-400 animate-pulse">Loading products...</p>
          </div>
        ) : ownerProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <HiSquare3Stack3D className="mx-auto text-4xl text-slate-600" />
            <h3 className="text-lg font-bold text-white">No products yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven&apos;t submitted any tech gear. Get verified and showcase your first gadget!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full text-slate-300">
              <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-6">#</th>
                  <th>Product</th>
                  <th>Votes</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {ownerProducts.map((product, index) => (
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
        )}
      </div>

      <CommonHelmet titlename={"My Products - Dashboard | Byte Bazaar"} />
    </div>
  );
};

export default MyProducts;
