import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineLogout, MdDashboard } from "react-icons/md";
import { HiBars3, HiXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
// import logo from "../../assets/logo/logo.png";
import useAuth from "../../Hooks/useAuth";
import useGetUser from "../../Hooks/useGetUser";
import "./nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const { userDataFromDB } = useGetUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItemClass = ({ isActive }) =>
    `relative px-3.5 py-1.5 rounded-lg text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
      isActive
        ? "text-red-500 bg-red-500/10 shadow-sm shadow-red-500/20"
        : "text-slate-200 hover:text-white hover:bg-white/10"
    }`;

  const mobileNavItemClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-semibold uppercase transition-all duration-300 ${
      isActive
        ? "text-red-400 bg-red-500/15 border-l-4 border-red-500 font-bold"
        : "text-slate-300 hover:text-white hover:bg-white/10"
    }`;

  const navlinks = (
    <>
      <NavLink to="/" className={navItemClass}>
        Home
      </NavLink>
      <NavLink to="/products" className={navItemClass}>
        Products
      </NavLink>
      <NavLink to="/faq" className={navItemClass}>
        FAQ
      </NavLink>
    </>
  );

  const mobileNavlinks = (
    <div
      className="flex flex-col space-y-1.5"
      onClick={() => setMobileMenuOpen(false)}
    >
      <NavLink to="/" className={mobileNavItemClass}>
        Home
      </NavLink>
      <NavLink to="/products" className={mobileNavItemClass}>
        Products
      </NavLink>
      <NavLink to="/faq" className={mobileNavItemClass}>
        FAQ
      </NavLink>
    </div>
  );

  const getDashboardLink = () => {
    if (userDataFromDB?.role === "Moderator") return "/dashboard/review-queue";
    if (userDataFromDB?.role === "Admin") return "/dashboard/statistics";
    return "/dashboard/profile";
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 py-3" : "bg-black backdrop-blur-md py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none lg:hidden transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <HiXMark className="w-6 h-6 text-red-500" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              {/* <div className="relative">
                <img
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
                  src={logo}
                  alt="Byte Bazaar Logo"
                />
                <div className="absolute -inset-1 bg-red-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div> */}
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center">
                Byte
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 ml-1">
                  Bazaar
                </span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navlinks}
          </nav>

          {/* Right: Auth & Profile Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {!user ? (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-md shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Login
              </Link>
            ) : (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="cursor-pointer flex items-center gap-2 p-1 rounded-full ring-2 ring-white/20 hover:ring-red-500/80 transition-all duration-300 group focus:outline-none"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-800">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={user?.displayName || "User Avatar"}
                      src={
                        user?.photoURL || "https://i.ibb.co/5x441PC/user.png"
                      }
                    />
                  </div>
                </label>

                <div
                  tabIndex={0}
                  className="dropdown-content z-50 mt-3 w-64 p-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl text-slate-200 space-y-1.5 animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* User Info Header */}
                  <div className="px-3 py-2.5 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-xs text-red-400 font-semibold uppercase tracking-wider">
                      <FaUser className="text-[11px]" />
                      <span>{userDataFromDB?.role || "Member"}</span>
                    </div>
                    <p className="font-bold text-white text-sm truncate mt-0.5">
                      {user?.displayName || "Byte User"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user?.email || ""}
                    </p>
                  </div>

                  {/* Dashboard link */}
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <MdDashboard className="text-lg text-red-400" />
                    <span>Dashboard</span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition-colors"
                  >
                    <MdOutlineLogout className="text-lg" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-2 border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
            {mobileNavlinks}
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;
