import { useNavigate, Link } from "react-router-dom";
import errorImage from "./error.svg";
import CommonHelmet from "../../Components/Common/Helmet";
import {
  HiHome,
  HiArrowUturnLeft,
  HiQuestionMarkCircle,
} from "react-icons/hi2";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-xl w-full mx-auto text-center flex flex-col items-center">
        {/* Error Vector with ambient card styling */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl mb-8 group hover:border-red-500/30 transition-all duration-300">
          <img
            className="w-64 sm:w-80 md:w-96 mx-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
            src={errorImage}
            alt="404 Page Not Found"
          />
        </div>

        {/* Status Badge */}
        <span className="px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-3">
          Error 404
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Lost in Void?
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          The page or tech product you are searching for might have been moved,
          deleted, or never existed in the first place.
        </p>

        {/* Navigation Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <HiArrowUturnLeft className="text-base" />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <HiHome className="text-base" />
            <span>Return Home</span>
          </button>
        </div>

        {/* Helpful links */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4 text-xs text-slate-400">
          <span>Need assistance?</span>
          <Link
            to="/faq"
            className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold transition-colors"
          >
            <HiQuestionMarkCircle className="text-sm" />
            <span>Visit Help & FAQ</span>
          </Link>
        </div>
      </div>

      <CommonHelmet titlename={"404 - Page Not Found | Byte Bazaar"} />
    </div>
  );
};

export default ErrorPage;
