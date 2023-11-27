import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useTotalReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: totalReviews } = useQuery({
    queryKey: ["totalReivews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getallreviews/${user?.email}`);
      return res.data;
    },
  });

  return { totalReviews };
};

export default useTotalReviews;
