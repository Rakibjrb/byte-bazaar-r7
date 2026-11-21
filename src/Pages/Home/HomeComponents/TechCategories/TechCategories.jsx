import { Link } from "react-router-dom";
import {
  HiCpuChip,
  HiComputerDesktop,
  HiDevicePhoneMobile,
  HiMusicalNote,
  HiWifi,
  HiArrowRight,
} from "react-icons/hi2";
import { BsSmartwatch } from "react-icons/bs";
import SectionHeader from "../../../../Components/SectionHeader/SectionHeader";

const categories = [
  {
    icon: HiCpuChip,
    name: "CPUs & Hardware",
    itemCount: "420+ Items",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-500",
  },
  {
    icon: HiComputerDesktop,
    name: "Laptops & Rigs",
    itemCount: "350+ Items",
    color: "from-red-500/20 to-rose-500/20 text-red-500",
  },
  {
    icon: BsSmartwatch,
    name: "Smart Wearables",
    itemCount: "190+ Items",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
  },
  {
    icon: HiMusicalNote,
    name: "Pro Audio Gear",
    itemCount: "280+ Items",
    color: "from-amber-500/20 to-orange-500/20 text-amber-500",
  },
  {
    icon: HiDevicePhoneMobile,
    name: "Smartphones & Tablets",
    itemCount: "510+ Items",
    color: "from-purple-500/20 to-violet-500/20 text-purple-500",
  },
  {
    icon: HiWifi,
    name: "IoT & Networking",
    itemCount: "140+ Items",
    color: "from-cyan-500/20 to-sky-500/20 text-cyan-500",
  },
];

const TechCategories = () => {
  return (
    <section className="mb-28">
      <div className="flex flex-col center gap-4 mb-8">
        <SectionHeader subtitle="Browse By Department" title="Top Categories" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={idx}
              to="/products"
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-red-500/40 hover:-translate-y-1.5 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl sm:text-3xl mb-3.5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
              >
                <Icon />
              </div>
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                {cat.name}
              </h3>
              <span className="text-xs text-slate-400 mt-1">
                {cat.itemCount}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TechCategories;
