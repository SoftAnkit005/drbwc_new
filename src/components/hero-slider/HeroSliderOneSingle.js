import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const HeroSliderOneSingle = ({ data }) => {
  return (
    <div className="single-slider slider-height-1 bg-purple">
      <img className="w-100 h-100" src={process.env.PUBLIC_URL + data.image} alt="" />
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderOneSingle;
