import PropTypes from "prop-types";
import clsx from "clsx";
import FeatureIconSingle from "../../components/feature-icon/FeatureIconSingle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSections } from "../../store/slices/feature-product-slice";

const FeaturedProducts = ({ spaceTopClass, spaceBottomClass }) => {
  const dispatch = useDispatch();
  const { sections, error } = useSelector((state) => state.featuredproduct);
  const [allFeatureProducts, setAllFeatureProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    if (sections?.success) {
      setAllFeatureProducts(sections.sections);
    }
  }, [sections?.success, sections?.sections, error]);

  return (
    <div className={clsx("support-area")}>
      <div>
        {allFeatureProducts?.map((singleFeature) => (
          <div className={clsx("d-flex justify-content-center products-list",spaceTopClass, spaceBottomClass)} key={singleFeature.id}>
            <FeatureIconSingle singleFeature={singleFeature} />
          </div>
        ))}
      </div>
    </div>
  );
};

FeaturedProducts.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default FeaturedProducts;
