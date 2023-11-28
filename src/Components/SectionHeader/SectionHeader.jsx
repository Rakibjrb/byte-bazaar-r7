import PropTypes from "prop-types";

const SectionHeader = ({ subtitle, title }) => {
  return (
    <div className="flex justify-center">
      <div>
        <h3 className="text-xl mb-3 text-red-500 text-center">{subtitle}</h3>
        <h2 className="text-4xl md:text-5xl uppercase">{title}</h2>
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
};
export default SectionHeader;
