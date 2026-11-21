import { useState } from "react";
import toast from "react-hot-toast";
import { HiEnvelope, HiPaperAirplane, HiSparkles, HiCheckCircle } from "react-icons/hi2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Welcome aboard! You're now on our VIP tech list.");
    setEmail("");
  };

  return (
    <section className="mb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-neutral-950 p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl">
        {/* Glow circles */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <HiSparkles className="text-red-400 text-base" />
            <span>Stay Ahead Of The Curve</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Never Miss Next-Gen Drops & Exclusive Tech Deals
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Get curated weekly briefings on groundbreaking tech launches, community discounts, and developer hardware drops.
          </p>

          {subscribed ? (
            <div className="mt-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-3 max-w-md mx-auto">
              <HiCheckCircle className="text-2xl" />
              <span className="font-semibold text-sm">You are subscribed! Check your inbox soon.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <div className="relative w-full">
                <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-md transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm whitespace-nowrap shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <span>Subscribe</span>
                <HiPaperAirplane className="text-base" />
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <HiCheckCircle className="text-emerald-400 text-sm" /> No spam ever
            </span>
            <span className="flex items-center gap-1.5">
              <HiCheckCircle className="text-emerald-400 text-sm" /> Unsubscribe anytime
            </span>
            <span className="flex items-center gap-1.5">
              <HiCheckCircle className="text-emerald-400 text-sm" /> 50,000+ Subscribers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
