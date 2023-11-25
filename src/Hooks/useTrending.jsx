import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTrending = (sort) => {
  const axios = useAxiosPublic();
  const {
    data: trending,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["trending", sort],
    queryFn: async () => {
      const res = await axios(`/api/trending?sort=${sort}`);
      return res.data;
    },
  });

  return [trending, isPending, refetch];
};

export default useTrending;