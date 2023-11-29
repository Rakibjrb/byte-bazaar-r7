import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_Dev_Url}/api`,
    withCredentials: true,
  });

  return instance;
};

export default useAxiosPublic;
