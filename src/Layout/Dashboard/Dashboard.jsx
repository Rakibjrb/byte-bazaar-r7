import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HiBars3 } from "react-icons/hi2";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      <div className="drawer lg:drawer-open w-full">
        <input type="checkbox" id="my-drawer" className="drawer-toggle" />

        {/* Main Content Area */}
        <div className="drawer-content flex flex-col flex-1 min-w-0 bg-slate-900">
          {/* Top Mobile Bar */}
          <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
            <label
              htmlFor="my-drawer"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors cursor-pointer"
              aria-label="Open sidebar"
            >
              <HiBars3 className="w-6 h-6" />
            </label>
            <span className="font-extrabold text-lg text-white">
              Byte<span className="text-red-500">Bazaar</span> Dashboard
            </span>
            <div className="w-6"></div>
          </div>

          {/* Subpage Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
