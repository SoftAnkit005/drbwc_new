import PropTypes from "prop-types";

const apiUrl = process.env.REACT_APP_API_URL;
const HeroSliderOneSingle = ({ data }) => {
  return (
    <div className="single-slider slider-height-1 bg-primary">
      <img className="w-100 h-100" src={`${apiUrl}/` + data.image_url} alt={data.title} />
    </div>
  );
};

HeroSliderOneSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderOneSingle;
