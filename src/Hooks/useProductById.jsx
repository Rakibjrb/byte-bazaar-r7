import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProductById = (id) => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isPending } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-product/${id}`);
      return res.data;
    },
  });
  return { data, isPending };
};

export default useProductById;
