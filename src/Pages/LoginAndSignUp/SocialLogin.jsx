import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLoading, googleLogin, setUserLoading } = useAuth();

  const handleGoogleLogin = () => {
    setUserLoading(true);
    googleLogin()
      .then(() => {
        toast.success("Google Login Successfull ...");
        navigate(location.state ? location?.state?.from : "/");
      })
      .catch((err) => {
        setUserLoading(false);
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
        {userLoading ? (
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
