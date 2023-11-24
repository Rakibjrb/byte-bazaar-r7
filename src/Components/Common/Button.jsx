import PropTypes from "prop-types";

const Button = ({ children }) => {
  return (
    <button className="bg-red-600 text-white uppercase font-semibold py-[6px] px-5 rounded-md hover:bg-red-400 transition-colors duration-500">
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string,
};
export default Button;
