import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="lg:bg-gray-300">
      <div className="drawer lg:drawer-open max-w-screen-2xl mx-auto">
        <input type="checkbox" id="my-drawer" className="drawer-toggle" />
        <div className="drawer-content bg-red-300 md:bg-transparent px-3 pt-3 xl:pt-0 xl:px-0">
          <label
            htmlFor="my-drawer"
            className="btn bg-gray-600 text-white drawer-button lg:hidden"
          >
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
          </label>
          <div className="mt-3">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
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
