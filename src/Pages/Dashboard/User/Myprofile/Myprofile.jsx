import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useTotalVote from "../../../../Hooks/DashboardData/useTotalVote";
import useTotalReviews from "../../../../Hooks/DashboardData/useTotalReviews";
import useTotalReports from "../../../../Hooks/DashboardData/useTotalReports";

const Myprofile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { totalVotes } = useTotalVote();
  const { totalReviews } = useTotalReviews();
  const { totalreports } = useTotalReports();
  const { data: userDataFromDB } = useQuery({
    queryKey: ["getsingleuser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <div className="bg-gray-700 px-8 py-20 md:p-8 rounded-2xl mt-5 min-h-[60vh] 2xl:min-h-[50vh]">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex justify-center md:justify-start">
            <img
              className="w-32 h-32 rounded-full border-4 border-white"
              src={
                user.email ? user.photoURL : "https://i.ibb.co/5x441PC/user.png"
              }
              alt=""
            />
          </div>
          <div>
            <h3 className="text-white mt-8 md:mt-0 text-xl md:text-2xl font-semibold">
              Subscription Status :{" "}
              <span className="text-red-500">
                {userDataFromDB?.subscription === "User"
                  ? "Not Verified"
                  : "Verified"}
              </span>
            </h3>
            <h3 className="text-white md:text-right mt-3 text-xl font-semibold">
              Joined on : {userDataFromDB?.date || "23-23-23"}
            </h3>
            <div className="flex md:justify-end mt-5">
              <button className="bg-red-800 text-white font-bold uppercase py-2 px-7 hover:bg-red-500 transition-colors duration-300 rounded-md">
                Subscribe for 100$
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-5 mt-10">
          <h3 className="text-white text-2xl md:text-3xl font-semibold">
            Name : {user?.email ? user?.displayName : "User 19419"}
          </h3>
          <h3 className="text-white text-xl md:text-3xl font-semibold">
            Email : {user?.email ? user?.email : "usermail@gmail.com"}
          </h3>
        </div>
        <div className="stats bg-red-50 shadow flex flex-col md:flex-row mt-20 gap-5">
          <div className="stat">
            <div className="stat-title text-2xl">Reviewed</div>
            <div className="stat-value">{totalReviews?.length || 0}+</div>
          </div>
          <div className="stat">
            <div className="stat-title text-2xl">Voted</div>
            <div className="stat-value">{totalVotes?.length || 0}+</div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl">Reported</div>
            <div className="stat-value">{totalreports?.length || 0}+</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
