import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import moment from "moment/moment";
import { ImSpinner3 } from "react-icons/im";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then((res) => {
        const userdata = {
          name: res?.user?.displayName,
          image: res?.user?.photoURL,
          email: res?.user?.email,
          date: moment().format("Y-M-D"),
          subscription: "User",
          role: "User",
        };
        axios
          .post("/user", userdata)
          .then(() => {
            setLoading(false);
            toast.success("Google Login Successfull ...");
            navigate(location.state ? location?.state?.from : "/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        toast.error("something went wrong !!!");
        console.log(err);
      });
  };

  return (
    <div className="mt-5">
      <div
        onClick={handleGoogleLogin}
        className="bg-transparent hover:bg-red-500 text-center btn w-full text-white uppercase"
      >
        {loading ? (
          <ImSpinner3 className="animate-spin text-xl" />
        ) : (
          <>
            <FcGoogle className="text-xl" /> Google
          </>
        )}
      </div>
    </div>
  );
};

export default SocialLogin;
