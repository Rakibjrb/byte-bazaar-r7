import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFeatured = (sort) => {
  const axios = useAxiosPublic();
  const {
    data: featured = [],
    isPending,
    refetch: refetch2,
  } = useQuery({
    queryKey: ["featured", sort],
    queryFn: async () => {
      const res = await axios(`/featured?sort=${sort}`);
      return res.data;
    },
  });

  return [featured, isPending, refetch2];
};

export default useFeatured;
