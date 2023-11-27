import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useGetUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userDataFromDB } = useQuery({
    queryKey: ["getsingleuser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  return { userDataFromDB };
};

export default useGetUser;
