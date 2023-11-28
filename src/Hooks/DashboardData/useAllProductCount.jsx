import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useAllProductCount = () => {
  const axios = useAxiosPublic();
  const { data: totalproducts = 1 } = useQuery({
    queryKey: ["documentcount"],
    queryFn: async () => {
      const res = await axios.get("/document-count");
      return res.data.totalDocuments;
    },
  });

  return { totalproducts };
};

export default useAllProductCount;
