import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useVote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleVote = () => {
    if (!user) {
      return navigate("/login");
    }
    alert("voted");
  };
  return handleVote;
};

export default useVote;
