import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import loginsvg from "../../assets/login/Login.svg";
import SocialLogin from "./SocialLogin";
import "./style.css";
import CommonHelmet from "../../Components/Common/Helmet";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    setLoading(true);
    userLogin(formData.email, formData.password)
      .then(() => {
        setLoading(false);
        toast.success("User login successfull ...");
        navigate(location.state ? location.state?.from : "/");
      })
      .catch((err) => {
        toast.error("something went wrong !!!");
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="bg-[#666] py-8 lg:py-16 xl:py-32 min-h-[100vh]">
      <div className="max-w-7xl mx-auto px-3 sm:px-0 py-10 lg:flex lg:items-center lg:gap-6 xl:gap-14">
        <div className="md:flex md:justify-center lg:ml-3">
          <img src={loginsvg} alt="" />
        </div>
        <div className="flex-1 mt-10 lg:mt-0 md:mx-3">
          <div className="card flex-shrink-0 w-full border rounded-lg pt-5 md:p-5">
            <h2 className="text-white pt-8 text-center text-3xl font-robotoslab font-bold">
              Login Now
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-3">
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Enter email here"
                  {...register("email", { required: true })}
                  className="text-white p-3 border bg-transparent border-white rounded-lg"
                />
                <p className="text-red-500 mt-2">
                  {errors.email && "This field is required"}
                </p>
              </div>
              <div className="form-control mt-5">
                <input
                  type="password"
                  placeholder="Enter passwrod here"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
                  })}
                  className="text-white p-3 border bg-transparent border-white rounded-lg"
                />
                <p className="text-red-500 mt-2">
                  {errors.password &&
                    "use uppercase, number and spacial letter"}
                </p>
              </div>
              <div className="form-control mt-2">
                <button
                  type="submit"
                  className="btn btn-error text-white font-bold uppercase mt-5"
                >
                  {loading ? (
                    <ImSpinner3 className="text-xl animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
            <div className="card-body pt-0">
              <p className="flex justify-between text-white">
                Already have an account?{" "}
                <Link to="/signup" replace>
                  <button className="transition-all duration-300 hover:text-red-400">
                    Please Singup
                  </button>
                </Link>
              </p>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
      <CommonHelmet titlename={"Login"} />
    </div>
  );
};

export default Login;
