import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomerSingleImage = ({ data }) => {
  return (
    <>
      <Link to={data.link} className="product-image" target="_blank">
        <img className="w-100" src={data.src} alt="" />
      </Link>
    </>
  );
};

CustomerSingleImage.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default CustomerSingleImage;
