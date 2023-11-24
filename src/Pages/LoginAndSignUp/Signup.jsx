import loginsvg from "../../assets/login/Login.svg";
import "./style.css";
import SocialLogin from "./SocialLogin";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-[#666] py-8 lg:py-16 xl:py-32 min-h-[100vh]">
      <div className="max-w-7xl mx-auto px-3 sm:px-0 py-10 lg:flex lg:items-center lg:gap-6 xl:gap-14">
        <div className="md:flex md:justify-center lg:ml-3">
          <img src={loginsvg} alt="" />
        </div>
        <div className="flex-1 mt-10 lg:mt-0 md:mx-3">
          <div className="card flex-shrink-0 w-full border rounded-lg pt-5 md:p-5">
            <h2 className="text-white pt-8 text-center text-3xl font-robotoslab font-bold">
              Sign Up Now
            </h2>
            <form className="card-body pb-3">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter name here"
                  name="name"
                  className="text-white p-3 border bg-transparent border-white rounded-lg"
                  required
                />
              </div>
              <div className="form-control my-5">
                <input
                  type="email"
                  placeholder="Enter email here"
                  name="email"
                  className="text-white p-3 border bg-transparent border-white rounded-lg"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Enter passwrod here"
                  name="password"
                  className="text-white p-3 border bg-transparent border-white rounded-lg"
                  required
                />
              </div>
              <div className="form-control mt-5">
                <input
                  type="file"
                  name="image"
                  className="text-white p-3 border bg-transparent border-white rounded-lg"
                  required
                />
              </div>
              <div className="form-control mt-2">
                <button
                  type="submit"
                  className="btn btn-error text-white font-bold uppercase mt-5"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="card-body pt-0">
              <p className="flex justify-between text-white">
                Already have an account?{" "}
                <Link to="/login" replace>
                  <button className="transition-all duration-300 hover:text-red-400">
                    Please Login
                  </button>
                </Link>
              </p>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
