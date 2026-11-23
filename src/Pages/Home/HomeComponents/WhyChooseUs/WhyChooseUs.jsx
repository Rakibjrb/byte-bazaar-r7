import { HiShieldCheck, HiTruck, HiArrowPath } from "react-icons/hi2";
import { IoMdHeadset } from "react-icons/io";

const features = [
  {
    icon: HiShieldCheck,
    title: "100% Genuine Tech",
    description:
      "Every gadget and component is verified for authenticity and manufacturer warranty.",
  },
  {
    icon: HiTruck,
    title: "Lightning Express Shipping",
    description:
      "Fast global delivery with real-time tracking straight to your doorstep.",
  },
  {
    icon: HiArrowPath,
    title: "30-Day Hassle-Free Returns",
    description:
      "Not satisfied? Return or exchange with our automated instant refund guarantee.",
  },
  {
    icon: IoMdHeadset,
    title: "24/7 Tech Specialist Support",
    description:
      "Expert assistance from seasoned tech geeks whenever you need troubleshooting.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="mb-28">
      <div className="rounded-3xl bg-slate-950 p-8 sm:p-12 lg:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-red-500 uppercase px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">
            The Byte Bazaar Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
            Why Tech Geeks Choose Us
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            We deliver more than just gadgets — we power your creative and
            developer workstation with trust and speed.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`why-choose-us-faq-${idx}`}
                className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-2xl mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 shadow-md">
                  <Icon />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
