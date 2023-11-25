import { useNavigate } from "react-router-dom";
import errorImage from "./error.svg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div>
        <img
          className="w-[300px] md:w-[500px]"
          src={errorImage}
          alt="404 route not found"
        />
        <h1 className="font-semibold text-4xl md:text-6xl xl:text-7xl text-center mt-5">
          Page Not Found
        </h1>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="hover:bg-red-600 transition-colors duration-300 w-[70%] bg-red-400 py-2 rounded-lg text-xl text-center text-white"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
