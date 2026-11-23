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
import {
  HiCheckBadge,
  HiXCircle,
  HiCalendarDays,
  HiEnvelope,
  HiTicket,
  HiChatBubbleBottomCenterText,
  HiHandThumbUp,
  HiFlag,
  HiSparkles,
  HiCreditCard,
} from "react-icons/hi2";

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
          Swal.fire({
            icon: "success",
            title: "Coupon Applied!",
            text: `Discounted Subscription Price: $${discount}`,
            confirmButtonColor: "#ef4444",
          });
          setAmount(discount);
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Coupon",
            text: "Please check your discount code and try again.",
            confirmButtonColor: "#ef4444",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Something went wrong with coupon validation");
      });
  };

  const isVerified = userDataFromDB?.subscription !== "User";

  return (
    <div className="space-y-8">
      {/* Profile Header Hero Card */}
      <div className="rounded-3xl bg-slate-950 border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative">
              <img
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white/10 shadow-xl"
                src={user?.photoURL || "https://i.ibb.co/5x441PC/user.png"}
                alt={user?.displayName || "Profile Avatar"}
              />
              {isVerified ? (
                <HiCheckBadge className="text-emerald-400 text-3xl absolute -bottom-2 -right-2 bg-slate-950 rounded-full border-2 border-slate-950" />
              ) : (
                <HiSparkles className="text-red-500 text-2xl absolute -bottom-2 -right-2 bg-slate-950 rounded-full p-0.5" />
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {user?.displayName || "Byte Enthusiast"}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 text-sm">
                <HiEnvelope className="text-red-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400 text-xs">
                <HiCalendarDays className="text-slate-500" />
                <span>Member since: {userDataFromDB?.date || "Recently"}</span>
              </div>
            </div>
          </div>

          {/* Subscription Status Chip & CTA */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border ${
                isVerified
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}
            >
              {isVerified ? (
                <>
                  <HiCheckBadge className="text-base" />
                  <span>Verified Creator Account</span>
                </>
              ) : (
                <>
                  <HiXCircle className="text-base" />
                  <span>Unverified (Standard Tier)</span>
                </>
              )}
            </div>

            {!isVerified && (
              <button
                onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <HiCreditCard className="text-base" />
                <span>Verify Badge ($100)</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl">
              <HiChatBubbleBottomCenterText />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {totalReviews?.length || 0}
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Reviews Given
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-2xl">
              <HiHandThumbUp />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {totalVotes?.length || 0}
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Product Upvotes
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl">
              <HiFlag />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {totalreports?.length || 0}
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase">
                Items Reported
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Payment Checkout Section */}
      {showCheckoutForm && !isVerified && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <HiCreditCard className="text-red-500" />
                <span>Verified Creator Subscription</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Unlock product publishing and get the official verified creator checkmark.
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-black text-lg">
              Total: ${amount}
            </div>
          </div>

          {/* Coupon Input Form */}
          <form
            onSubmit={handleDiscount}
            className="flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <div className="relative flex-1">
              <HiTicket className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                name="cupon"
                placeholder="Have a coupon code?"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
            >
              Apply Code
            </button>
          </form>

          {/* Stripe Card Element Box */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <Elements stripe={stripePromise}>
              <Checkout amount={amount} />
            </Elements>
          </div>
        </div>
      )}

      <CommonHelmet titlename={"Dashboard - My Profile | Byte Bazaar"} />
    </div>
  );
};

export default Myprofile;
