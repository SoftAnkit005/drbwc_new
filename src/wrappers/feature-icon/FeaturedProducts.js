import PropTypes from "prop-types";
import clsx from "clsx";
import featureIconData from "../../data/feature-icons/feature-icon.json";
import FeatureIconSingle from "../../components/feature-icon/FeatureIconSingle";

const FeaturedProducts = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("support-area", spaceTopClass, spaceBottomClass)}>
      <div>
          {featureIconData?.map(singleFeature => (
            <div className="d-flex justify-content-center products-list" key={singleFeature.id}>
              <FeatureIconSingle
                singleFeature={singleFeature}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

FeaturedProducts.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default FeaturedProducts;
