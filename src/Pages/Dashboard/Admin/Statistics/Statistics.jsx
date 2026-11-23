import Piechart from "./Piechart";
import useAuth from "../../../../Hooks/useAuth";
import useTotalReports from "../../../../Hooks/DashboardData/useTotalReports";
import useTotalReviews from "../../../../Hooks/DashboardData/useTotalReviews";
import useAllProductCount from "../../../../Hooks/DashboardData/useAllProductCount";
import useTotalVoteForAdmin from "../../../../Hooks/DashboardData/useTotalVoteForAdmin";
import CommonHelmet from "../../../../Components/Common/Helmet";
import {
  HiChatBubbleBottomCenterText,
  HiSquare3Stack3D,
  HiHandThumbUp,
  HiFlag,
  HiSparkles,
} from "react-icons/hi2";

const Statistics = () => {
  const { user } = useAuth();
  const { totalreports } = useTotalReports();
  const { totalVotesforadmin } = useTotalVoteForAdmin();
  const { totalReviews } = useTotalReviews();
  const { totalproducts } = useAllProductCount();

  const metrics = [
    {
      title: "Total Reviews",
      value: totalReviews?.length || 0,
      icon: HiChatBubbleBottomCenterText,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400",
    },
    {
      title: "Platform Products",
      value: totalproducts || 0,
      icon: HiSquare3Stack3D,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-400",
    },
    {
      title: "All Upvotes",
      value: totalVotesforadmin?.length || 0,
      icon: HiHandThumbUp,
      color: "from-red-500/20 to-rose-500/20 text-red-400",
    },
    {
      title: "Reported Items",
      value: totalreports?.length || 0,
      icon: HiFlag,
      color: "from-rose-500/20 to-pink-500/20 text-rose-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <HiSparkles />
              <span>Admin Operations Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
                {user?.displayName || "Administrator"}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Here is an overview of the live activity and performance across Byte Bazaar.
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-950 border border-white/10 shadow-xl flex items-center justify-between group hover:border-red-500/30 transition-all duration-300"
            >
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {metric.title}
                </div>
                <div className="text-3xl font-black text-white mt-2">
                  {metric.value}
                </div>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
              >
                <Icon />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-white/10 shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold text-white">Distribution Breakdown</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ratio of products, votes, reviews, and community flags
          </p>
        </div>

        <div className="w-full max-w-xl mx-auto py-6">
          <Piechart
            totalReviews={totalReviews}
            totalVotesforadmin={totalVotesforadmin}
            totalreports={totalreports}
            totalproducts={totalproducts}
          />
        </div>
      </div>

      <CommonHelmet titlename={"Admin Statistics - Byte Bazaar"} />
    </div>
  );
};

export default Statistics;
