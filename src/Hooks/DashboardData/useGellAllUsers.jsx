import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import useAuth from "../useAuth";

const useGellAllUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allusers, refetch } = useQuery({
    queryKey: ["alldbusers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/get-all-users/${user?.email}`);
      return res.data;
    },
  });

  return { allusers, refetch };
};

export default useGellAllUsers;
