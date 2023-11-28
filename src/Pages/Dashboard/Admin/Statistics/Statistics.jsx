import useAuth from "../../../../Hooks/useAuth";

const Statistics = () => {
  const { user } = useAuth();

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

      <div className="stats shadow flex flex-col md:flex-row mt-8 gap-5">
        <div className="stat">
          <div className="stat-title text-2xl">Reviewed</div>
          <div className="stat-value">{50}+</div>
        </div>
        <div className="stat">
          <div className="stat-title text-2xl">Voted</div>
          <div className="stat-value">{330}+</div>
        </div>

        <div className="stat">
          <div className="stat-title text-2xl">Reported</div>
          <div className="stat-value">{10}+</div>
        </div>

        <div className="stat">
          <div className="stat-title text-2xl">Subsciption</div>
          <div className="text-xl text-red-500 font-bold">Not subscribed</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
