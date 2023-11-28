import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCupon = () => {
  const axios = useAxiosPublic();

  const {
    data: allcupons,
    isPending: cuponloading,
    refetch: cuponrefetch,
  } = useQuery({
    queryKey: ["getallcupons"],
    queryFn: async () => {
      const res = await axios.get("/cupon");
      return res.data;
    },
  });

  return { allcupons, cuponloading, cuponrefetch };
};

export default useCupon;
