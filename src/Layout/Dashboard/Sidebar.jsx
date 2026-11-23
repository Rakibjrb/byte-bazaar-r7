import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiUser,
  HiPlusCircle,
  HiSquare3Stack3D,
  HiClipboardDocumentList,
  HiFlag,
  HiChartBar,
  HiUsers,
  HiTicket,
  HiArrowLeftOnRectangle,
  HiHome,
  HiSparkles,
} from "react-icons/hi2";
import logo from "../../assets/logo/logo.png";
import useAuth from "../../Hooks/useAuth";
import useGetUser from "../../Hooks/useGetUser";

const Sidebar = () => {
  const { userDataFromDB } = useGetUser();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    logOut();
  };

  const role = userDataFromDB?.role || "User";

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group ${
      isActive
        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30 font-bold"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`;

  const userlinks = (
    <>
      <li>
        <NavLink to="/dashboard/profile" className={navLinkClass}>
          <HiUser className="text-xl group-hover:scale-110 transition-transform" />
          <span>My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-product" className={navLinkClass}>
          <HiPlusCircle className="text-xl group-hover:scale-110 transition-transform" />
          <span>Add Product</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-products" className={navLinkClass}>
          <HiSquare3Stack3D className="text-xl group-hover:scale-110 transition-transform" />
          <span>My Products</span>
        </NavLink>
      </li>
    </>
  );

  const moderatorLinks = (
    <>
      <li>
        <NavLink to="/dashboard/review-queue" className={navLinkClass}>
          <HiClipboardDocumentList className="text-xl group-hover:scale-110 transition-transform" />
          <span>Review Queue</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/reported-products" className={navLinkClass}>
          <HiFlag className="text-xl group-hover:scale-110 transition-transform" />
          <span>Reported Items</span>
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/statistics" className={navLinkClass}>
          <HiChartBar className="text-xl group-hover:scale-110 transition-transform" />
          <span>Platform Analytics</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-users" className={navLinkClass}>
          <HiUsers className="text-xl group-hover:scale-110 transition-transform" />
          <span>Manage Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-cupons" className={navLinkClass}>
          <HiTicket className="text-xl group-hover:scale-110 transition-transform" />
          <span>Manage Coupons</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <aside className="w-72 lg:w-80 h-full min-h-screen bg-slate-950 border-r border-white/10 text-slate-200 flex flex-col justify-between p-5 relative z-40">
      {/* Top Brand & Profile Badge */}
      <div>
        <Link to="/" className="flex items-center gap-3 px-2 py-3 group">
          <div className="relative">
            <img
              className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
              src={logo}
              alt="Byte Bazaar"
            />
            <div className="absolute -inset-1 bg-red-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
            Byte
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 ml-1">
              Bazaar
            </span>
          </span>
        </Link>

        {/* Current user card pill */}
        <div className="mt-5 p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
          <div className="relative">
            <img
              src={user?.photoURL || "https://i.ibb.co/5x441PC/user.png"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
          </div>
          <div className="overflow-hidden flex-1">
            <h4 className="text-xs font-bold text-white truncate">
              {user?.displayName || "Byte User"}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                <HiSparkles className="text-[10px]" />
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="mt-8">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-4 mb-3">
            Menu Navigation
          </div>
          <ul className="space-y-1.5">
            {role === "User" && userlinks}
            {role === "Moderator" && moderatorLinks}
            {role === "Admin" && adminLinks}
          </ul>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <HiHome className="text-xl text-slate-400" />
          <span>Return Home</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors"
        >
          <HiArrowLeftOnRectangle className="text-xl" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
