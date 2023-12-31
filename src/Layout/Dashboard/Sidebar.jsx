import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaShop } from "react-icons/fa6";
import { MdAddCard } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { GrUserManager } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import useGetUser from "../../Hooks/useGetUser";

const userlinks = (
  <>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/profile"
      >
        <CgProfile className="text-3xl" /> My Profile
      </NavLink>
    </li>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/add-product"
      >
        <FaShop className="text-3xl" /> Add Product
      </NavLink>
    </li>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/my-products"
      >
        <MdAddCard className="text-3xl" /> My Products
      </NavLink>
    </li>
  </>
);

const moderator = (
  <>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/review-queue"
      >
        <FaShop className="text-3xl" /> Product Review Queue
      </NavLink>
    </li>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/reported-products"
      >
        <MdAddCard className="text-3xl" /> Reported Products
      </NavLink>
    </li>
  </>
);

const admin = (
  <>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/statistics"
      >
        <BsGraphUpArrow className="text-3xl" /> Statistics
      </NavLink>
    </li>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/manage-users"
      >
        <GrUserManager className="text-3xl" /> Manage Users
      </NavLink>
    </li>
    <li>
      <NavLink
        className="text-xl flex items-center gap-3"
        to="/dashboard/manage-cupons"
      >
        <TbDiscountCheckFilled className="text-3xl" /> Manage Coupons
      </NavLink>
    </li>
  </>
);

const Sidebar = () => {
  const { userDataFromDB } = useGetUser();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/");
    logOut();
  };
  const user = userDataFromDB?.role || "User";

  return (
    <div className="sticky top-0 left-0 p-4 w-[320px] md:w-1/2 lg:w-80 lg:mr-3 h-screen bg-gray-700 text-white">
      <div className="min-h-screen relative">
        <div className="mb-10 flex justify-center items-center h-20">
          <h2 className="text-2xl">Dashboard</h2>
        </div>
        {user === "User" && <ul className="space-y-6 px-5">{userlinks}</ul>}
        {user === "Moderator" && (
          <ul className="space-y-6 px-5">{moderator}</ul>
        )}
        {user === "Admin" && <ul className="space-y-6 px-5">{admin}</ul>}
        <div className="absolute bottom-16 px-5 w-full">
          <Link to="/" className="text-xl flex items-center gap-3">
            <FaShop className="text-3xl" /> Go Home
          </Link>
          <button
            onClick={handleLogout}
            className="text-xl flex items-center gap-3 mt-5"
          >
            <LuLogOut className="text-3xl" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
