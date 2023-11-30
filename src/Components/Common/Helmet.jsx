import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const CommonHelmet = ({ titlename }) => {
  return (
    <Helmet>
      <title>{`Byte Bazzar - ${titlename}`}</title>
    </Helmet>
  );
};

CommonHelmet.propTypes = {
  titlename: PropTypes.string,
};
export default CommonHelmet;
