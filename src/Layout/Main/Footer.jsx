import moment from "moment/moment";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import {
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
  FaDiscord,
  FaHeart,
} from "react-icons/fa6";
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiArrowUpRight,
} from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info & Mission (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <img
                  className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                  src={logo}
                  alt="Byte Bazaar Logo"
                />
                <div className="absolute -inset-1 bg-red-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
                Byte
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 ml-1">
                  Bazaar
                </span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The premier destination for next-gen hardware, developer gear, and smart electronics. Discover, upvote, and experience tomorrow’s technology today.
            </p>

            {/* Contact Snippets */}
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                <HiMapPin className="text-red-500 text-sm flex-shrink-0" />
                <span>Silicon Avenue, Tech City, CA 94016</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                <HiEnvelope className="text-red-500 text-sm flex-shrink-0" />
                <span>support@bytebazaar.com</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-white transition-colors">
                <HiPhone className="text-red-500 text-sm flex-shrink-0" />
                <span>+1 (800) 843-2983</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {[
                { icon: FaGithub, href: "https://github.com", label: "GitHub" },
                { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: FaDiscord, href: "https://discord.com", label: "Discord" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white border border-white/10 hover:border-red-500 flex items-center justify-center text-sm transition-all duration-300 hover:scale-110 shadow-sm"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "All Products", to: "/products" },
                { label: "FAQ & Help", to: "/faq" },
                { label: "Trending Devices", to: "/products" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Dashboard Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Community
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Member Profile", to: "/dashboard/profile" },
                { label: "Upvoted Products", to: "/dashboard/my-products" },
                { label: "Submit New Gadget", to: "/dashboard/add-product" },
                { label: "Terms of Service", to: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Legal & Privacy
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Privacy Policy", to: "#" },
                { label: "Cookie Policy", to: "#" },
                { label: "Security & Encryption", to: "#" },
                { label: "Affiliate Disclosure", to: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.to}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {moment().format("YYYY")} <strong className="text-slate-200">Byte Bazaar</strong>. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            <span>Built for developers & tech enthusiasts with</span>
            <FaHeart className="text-red-500 text-xs animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
