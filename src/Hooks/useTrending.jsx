import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTrending = () => {
  const axios = useAxiosPublic();
  const {
    data: trending,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axios(`/trending`);
      return res.data;
    },
  });

  return [trending, isPending, refetch];
};

export default useTrending;
