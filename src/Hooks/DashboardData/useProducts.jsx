import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allPendingProducts, refetch: pendingRefetch } = useQuery({
    queryKey: ["allproducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getprendingproducts/${user?.email}`);
      return res.data;
    },
  });

  return { allPendingProducts, pendingRefetch };
};

export default useProducts;
