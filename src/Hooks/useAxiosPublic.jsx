import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_Server_Url}/api`,
  });

  return instance;
};

export default useAxiosPublic;
