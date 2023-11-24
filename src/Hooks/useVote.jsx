import { useNavigate } from "react-router-dom";

const useVote = () => {
  const navigate = useNavigate();
  const user = false;

  const handleVote = () => {
    if (!user) {
      return navigate("/login");
    }
    alert("voted");
  };
  return handleVote;
};

export default useVote;
