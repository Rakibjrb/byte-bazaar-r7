import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTrending = (sort) => {
  const axios = useAxiosPublic();
  const {
    data: trending = [],
    isPending,
    refetch: refetchtrending,
  } = useQuery({
    queryKey: ["trending", sort],
    queryFn: async () => {
      const res = await axios(`/trending?sort=${sort}`);
      return res.data;
    },
  });

  return [trending, isPending, refetchtrending];
};

export default useTrending;
