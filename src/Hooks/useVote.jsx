import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useState } from "react";
import useFeatured from "./useFeatured";
import Swal from "sweetalert2";
import useTrending from "./useTrending";

const useVote = (id, votes) => {
  const [reload, setReload] = useState(false);
  const [, , refetch2] = useFeatured(reload ? "desc" : "asc");
  const [, , refetch] = useTrending(reload ? "desc" : "asc");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleVote = async () => {
    if (!user) {
      return navigate("/login");
    }
    const res = await axiosSecure.post("/vote", { id, votes: votes + 1 });
    setReload(!reload);
    refetch2();
    refetch();
    res.data && Swal.fire("Voted");
  };
  return handleVote;
};

export default useVote;
