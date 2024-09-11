import PropTypes from "prop-types";
import clsx from "clsx";

const GallerySingle = ({ data, spaceBottomClass }) => {
  return (
      <div className={clsx("gallery-box", spaceBottomClass)}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" className="gallery-img" />
      </div>
  );
};

GallerySingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default GallerySingle;
