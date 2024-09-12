import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductSingleVideo = ({ data }) => {
  return (
    <>
      <Link to={data.link} className="product-image" target="_blank">
        <img className="w-100" src={data.src} alt="" />
        <img className="play-icon" src="assets/img/product/drbwc_images/play.gif" alt="play Button" />
      </Link>
    </>
  );
};

ProductSingleVideo.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default ProductSingleVideo;
