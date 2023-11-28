import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useGetAlldbproducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: alldbproducts } = useQuery({
    queryKey: ["alldbproductsforadmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/get-all-product-from-db/${user?.email}`
      );
      return res.data;
    },
  });

  return { alldbproducts };
};

export default useGetAlldbproducts;
