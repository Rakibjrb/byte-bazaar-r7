import axios from "axios";

const useAxiosSecure = () => {
  const secureInstance = axios.create({
    baseURL: `${import.meta.env.VITE_Server_Url}/api`,
    withCredentials: true,
  });

  return secureInstance;
};

export default useAxiosSecure;
