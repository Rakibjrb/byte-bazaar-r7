import useTotalReports from "../../../../Hooks/DashboardData/useTotalReports";
import useTotalReviews from "../../../../Hooks/DashboardData/useTotalReviews";
import useTotalVote from "../../../../Hooks/DashboardData/useTotalVote";
import useAuth from "../../../../Hooks/useAuth";
import Piechart from "./Piechart";

const Statistics = () => {
  const { user } = useAuth();
  const { totalreports } = useTotalReports();
  const { totalVotes } = useTotalVote();
  const { totalReviews } = useTotalReviews();

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-4xl">
          HI,{" "}
          <span className="font-bold text-red-400">
            {user?.displayName || " Rakibul Hasan!"}
          </span>
        </h1>
      </div>

      <div className="stats shadow flex flex-col md:flex-row mt-8 gap-5 mr-5">
        <div className="stat">
          <div className="stat-title text-xl xl:text-2xl">Reviews</div>
          <div className="stat-value">{totalReviews?.length || 0}+</div>
        </div>
        <div className="stat">
          <div className="stat-title text-xl xl:text-2xl">Votes</div>
          <div className="stat-value">{totalVotes?.length || 0}+</div>
        </div>

        <div className="stat">
          <div className="stat-title text-xl xl:text-2xl">
            Reported Products
          </div>
          <div className="stat-value">{totalreports?.length || 0}+</div>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-3xl font-bold">Charts</h3>
        <div className="w-4/5 md:w-1/2 lg:w-full mx-auto">
          <Piechart
            totalReviews={totalReviews}
            totalVotes={totalVotes}
            totalreports={totalreports}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
