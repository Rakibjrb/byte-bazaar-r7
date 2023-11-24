import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineLogout, MdDashboard } from "react-icons/md";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Button from "../../Components/Common/Button";

import "./nav.css";

const navlinks = (
  <>
    <li>
      <NavLink to="/" className="text-[16px] uppercase">
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to="/products" className="text-[16px] uppercase">
        Products
      </NavLink>
    </li>
    <li>
      <NavLink to="/contact" className="text-[16px] uppercase">
        contact us
      </NavLink>
    </li>
    <li>
      <NavLink to="/faq" className="text-[16px] uppercase">
        faq
      </NavLink>
    </li>
  </>
);

const Nav = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [sticky, setSticky] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User logout success ...");
        navigate("/");
      })
      .catch((err) => {
        toast.error("something went wrong !!!");
        console.log(err);
      });
  };

  const loggedLinks = (
    <>
      <li className="cursor-none">
        <a>
          <FaUser /> {(user && user.displayName) || "user19419"}
        </a>
      </li>
      <li>
        <Link to="/user-dashboard/profile">
          <MdDashboard /> Dashboard
        </Link>
      </li>
      <li>
        <button onClick={handleLogout}>
          <MdOutlineLogout /> Logout
        </button>
      </li>
    </>
  );

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 200) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  return (
    <div
      className={`py-2 z-[100000] transition-all duration-1000  ${
        sticky
          ? "sticky top-0 bg-[#3d3d3d97] text-white"
          : "text-white z-[100000] bg-[#3d3d3d]"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-3 xl:px-0 z-[10000]">
        <div className="navbar-start z-[1000]">
          <div className="dropdown">
            <button className="p-2 focus:ring-2 focus:ring-red-500  rounded-md mr-3 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="text-black rounded-md space-y-3 py-5 mt-3 menu-sm dropdown-content z-[1] p-2 shadow bg-base-300 w-[220px]"
            >
              {navlinks}
            </ul>
          </div>
          <a className="font-bold text-xl">
            byte
            <span className="text-red-500 font-extrabold"> Bazaar</span>
          </a>
        </div>
        <div className="navbar-end z-[100000]">
          <div className="hidden lg:flex">
            <ul className="menu-horizontal px-1 space-x-5 font-semibold">
              {navlinks}
            </ul>
          </div>
          {!user ? (
            <Link to="/login" className="ml-6">
              <Button>Login</Button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end ml-2 z-[100000]">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    className={`${
                      sticky && "border-2 rounded-full"
                    } border-1 border-white`}
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL || "https://i.ibb.co/5x441PC/user.png"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className=" font-semibold py-4 space-y-2 menu menu-sm dropdown-content  z-[1] p-2 shadow bg-base-200 rounded-box min-w-[250px] text-black"
              >
                {loggedLinks}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
