import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const secureInstance = axios.create({
    baseURL: `${import.meta.env.VITE_Dev_Url}/api`,
    withCredentials: true,
  });

  secureInstance.interceptors.request.use(
    function (config) {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  secureInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        logOut();
        navigate("/user-login");
      }
      return Promise.reject(error);
    }
  );

  return secureInstance;
};

export default useAxiosSecure;
