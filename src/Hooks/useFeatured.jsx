import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFeatured = () => {
  const axios = useAxiosPublic();
  const {
    data: featured,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await axios(`/featured`);
      return res.data;
    },
  });

  return [featured, isPending, refetch];
};

export default useFeatured;
