import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const useVote = (id, votes) => {
  const [voted, setVoted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

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
    res.data && Swal.fire("Voted");
    setVoted(true);
  };
  return { handleVote, voted };
};

export default useVote;
