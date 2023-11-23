import PropTypes from "prop-types";

const Button = ({ children }) => {
  return (
    <button className="bg-[#7752FE] text-white font-semibold py-[6px] px-5 rounded-md hover:bg-[#6c51ccec] transition-colors duration-500">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
};
export default Button;
