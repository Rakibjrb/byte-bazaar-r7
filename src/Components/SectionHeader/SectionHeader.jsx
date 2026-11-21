import PropTypes from "prop-types";

const SectionHeader = ({ subtitle, title }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
      <span className="text-xs sm:text-sm font-bold tracking-widest text-red-500 uppercase px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 mb-3">
        {subtitle}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
        {title}
      </h2>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span className="w-8 h-1 bg-red-500 rounded-full"></span>
        <span className="w-2.5 h-1 bg-rose-400 rounded-full"></span>
        <span className="w-1 h-1 bg-rose-300 rounded-full"></span>
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default SectionHeader;
