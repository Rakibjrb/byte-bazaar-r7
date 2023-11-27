import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import useAuth from "../useAuth";

const useTotalVote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: totalVotes } = useQuery({
    queryKey: ["getAllVotesFromDbForUserAndAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getallvotes/${user?.email}`);
      return res.data;
    },
  });

  return { totalVotes };
};

export default useTotalVote;
