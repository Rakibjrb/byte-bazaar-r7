import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../../../Hooks/useAuth";
import useTotalVote from "../../../../Hooks/DashboardData/useTotalVote";
import useTotalReviews from "../../../../Hooks/DashboardData/useTotalReviews";
import useTotalReports from "../../../../Hooks/DashboardData/useTotalReports";
import useGetUser from "../../../../Hooks/useGetUser";
import Checkout from "./Checkout";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import CommonHelmet from "../../../../Components/Common/Helmet";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Myprofile = () => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [amount, setAmount] = useState(100);
  const { user } = useAuth();
  const { userDataFromDB } = useGetUser();
  const { totalVotes } = useTotalVote();
  const { totalReviews } = useTotalReviews();
  const { totalreports } = useTotalReports();
  const axiosSecure = useAxiosSecure();

  const handleDiscount = (e) => {
    e.preventDefault();
    const cupon = e.target.cupon.value;
    axiosSecure
      .post("/validate-cupon", { cupon })
      .then((res) => {
        const validated = res.data;
        if (validated.amount) {
          const validatedamount = `0.${validated.amount}`;
          const inFloat = parseFloat(validatedamount);
          const calc = 100 * inFloat;
          const discount = 100 - calc;
          Swal.fire(`Discount Amount : ${discount}$`);
          setAmount(discount);
        } else {
          Swal.fire("Invalid Entered Cupon!");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("something went wrong");
      });
  };

  return (
    <div>
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
              {userDataFromDB?.subscription !== "User" ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <span className="text-red-500">Not Verified</span>
              )}
            </h3>
            <h3 className="text-white md:text-right mt-3 text-xl font-semibold">
              Joined on : {userDataFromDB?.date || "23-23-23"}
            </h3>
            {userDataFromDB?.subscription === "User" && (
              <div className="flex md:justify-end mt-5">
                <button
                  onClick={() => {
                    setShowCheckoutForm(true);
                  }}
                  className="bg-red-800 text-white font-bold uppercase py-2 px-7 hover:bg-red-500 transition-colors duration-300 rounded-md"
                >
                  Subscribe for 100$
                </button>
              </div>
            )}
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
      <div className={`${showCheckoutForm ? "" : "hidden"} mt-8 mb-12`}>
        <h2 className="text-3xl font-semibold">Make Payment Now</h2>
        <form
          onSubmit={handleDiscount}
          className="w-full max-w-4xl mx-auto flex mt-10"
        >
          <input
            type="text"
            placeholder="BYTEBAZZAREXAMPLE"
            name="cupon"
            className="px-3 w-full rounded-l-lg rounded-r-none placeholder:text-black"
            required
          />
          <button className="btn rounded-l-none bg-red-400 uppercase text-white font-semibold">
            Get Discount
          </button>
        </form>
        <div className="max-w-4xl mx-auto mt-10">
          <Elements stripe={stripePromise}>
            <Checkout
              amount={amount}
              setShowCheckoutForm={setShowCheckoutForm}
            />
          </Elements>
        </div>
      </div>
      <CommonHelmet titlename={"My profile"} />
    </div>
  );
};

export default Myprofile;
