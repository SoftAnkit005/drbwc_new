import PropTypes from "prop-types";

const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="container row">
      <div className="col-md-6 products-img">
        <img src={process.env.PUBLIC_URL + singleFeature.image} alt="" />
      </div>
      <div className="col-md-6 products-info">
        <h5 className="products-feature">Auto Wellness Program</h5>
        <h5 className="company-name">{singleFeature.brand}</h5>
        <h5 className="products-title">{singleFeature.title}</h5>
        <p className="product-desc">{singleFeature.description}</p>
        <button type="button" className="btn btn-primary">View All Products</button>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.shape({})
};

export default FeatureIconSingle;
