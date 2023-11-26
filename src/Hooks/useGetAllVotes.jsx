import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllVotes = () => {
  const { user } = useAuth();
  const axios = useAxiosPublic();

  const { data: votedproduct } = useQuery({
    queryKey: ["getvotes"],
    queryFn: async () => {
      const res = await axios.get(`/getallvotes/${user?.email}`);
      return res.data;
    },
  });

  return { votedproduct };
};

export default useGetAllVotes;
