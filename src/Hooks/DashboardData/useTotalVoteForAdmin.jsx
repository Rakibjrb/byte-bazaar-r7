import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import useAuth from "../useAuth";

const useTotalVoteForAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: totalVotesforadmin } = useQuery({
    queryKey: ["getAllVotesFromDbForAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getallvotesforadmin/${user?.email}`);
      return res.data;
    },
  });

  return { totalVotesforadmin };
};

export default useTotalVoteForAdmin;
