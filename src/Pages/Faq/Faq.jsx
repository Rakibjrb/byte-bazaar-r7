import { useState } from "react";
import CommonHelmet from "../../Components/Common/Helmet";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import {
  HiChevronDown,
  HiQuestionMarkCircle,
  HiCreditCard,
  HiShieldCheck,
  HiShoppingBag,
  HiEnvelopeOpen,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const faqData = [
  {
    icon: HiQuestionMarkCircle,
    question: "What is Byte Bazaar?",
    answer:
      "Byte Bazaar is the go-to community platform and digital storefront for cutting-edge tech products, developer workstations, and futuristic gadgets. Our community curates, reviews, and upvotes the latest tech innovations daily.",
  },
  {
    icon: HiShoppingBag,
    question: "How do I discover and place an order?",
    answer:
      "Simply browse through our Featured or Trending catalog, inspect detailed product specs, read community feedback, and hit 'Order' or follow the merchant link to complete checkout securely.",
  },
  {
    icon: HiCreditCard,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, MasterCard, American Express), Stripe secure checkout, PayPal, and digital wallets with multi-currency support.",
  },
  {
    icon: HiShieldCheck,
    question: "Is my personal and payment data safe?",
    answer:
      "Yes, 100%. All transactions are processed through end-to-end 256-bit SSL encrypted channels adhering strictly to PCI-DSS compliance standards. We never store raw credit card credentials.",
  },
  {
    icon: HiEnvelopeOpen,
    question: "How do discount coupons and subscription drops work?",
    answer:
      "You can find active discount codes directly in our 'Discount Coupons' section on the homepage. Copy the code with one click and apply it during subscription checkout for instant savings.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <SectionHeader
          subtitle="Everything You Need To Know"
          title="Frequently Asked Questions"
        />

        {/* Accordion container */}
        <div className="mt-10 space-y-4">
          {faqData.map((item, idx) => {
            const Icon = item.icon;
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-white border-red-500/30 shadow-lg shadow-red-500/5"
                    : "bg-white/80 hover:bg-white border-slate-200/80 shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors duration-200 ${
                        isOpen
                          ? "bg-red-500 text-white"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      <Icon />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {item.question}
                    </span>
                  </div>

                  <div
                    className={`p-2 rounded-lg text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-red-500" : ""
                    }`}
                  >
                    <HiChevronDown className="text-xl" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 mt-1 animate-in fade-in duration-200">
                    <p className="pl-13 sm:pl-14">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA card */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-neutral-900 border border-white/10 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center text-3xl flex-shrink-0">
              <HiChatBubbleLeftRight />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Still have questions?</h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Our technical support team is online 24/7 to help you.
              </p>
            </div>
          </div>

          <Link
            to="/products"
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            Explore Tech Products
          </Link>
        </div>
      </div>
      <CommonHelmet titlename={"FAQ - Byte Bazaar"} />
    </div>
  );
};

export default Faq;
