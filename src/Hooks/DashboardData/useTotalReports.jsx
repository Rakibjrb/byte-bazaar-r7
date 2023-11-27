import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";

const useTotalReports = () => {
  const { user } = useAuth();
  const axiosAxiosSecure = useAxiosSecure();

  const { data: totalreports } = useQuery({
    queryKey: ["gettotalreports", user?.email],
    queryFn: async () => {
      const res = await axiosAxiosSecure.get(`/getallreports/${user?.email}`);
      return res.data;
    },
  });

  return { totalreports };
};

export default useTotalReports;
