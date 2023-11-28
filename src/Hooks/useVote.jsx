import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./useAuth";
import useProductById from "./useProductById";
import useTrending from "./useTrending";
import useAxiosSecure from "./useAxiosSecure";
import useFeatured from "./useFeatured";

const useVote = (id, votes) => {
  const [voted, setVoted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { refetchProductById } = useProductById(id);
  const [, , refetchtrending] = useTrending(voted ? "desc" : "asc");
  const [, , refetchfeatured] = useFeatured(voted ? "desc" : "asc");

  const handleVote = async () => {
    if (!user) {
      return navigate("/login");
    }
    const voteData = {
      productId: id,
      votes: votes + 1,
      useremail: user?.email,
    };
    const res = await axiosSecure.post("/vote", voteData);
    setVoted(true);
    refetchtrending();
    refetchfeatured();
    refetchProductById();
    res.data && Swal.fire("Voted");
  };
  return { handleVote, voted };
};

export default useVote;
