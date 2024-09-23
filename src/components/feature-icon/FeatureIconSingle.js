import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const FeatureIconSingle = ({ singleFeature }) => {
  const { categories } = useSelector((state) => state.categories);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (categories?.success) {
      setCategoryData(categories?.categories);
    }
  }, [categories]);

  const filterCategory = (categoryId) => {
    return categoryData?.find((category) => category.id === categoryId);
  };

  const category = filterCategory(Number(singleFeature.category_id));
  
  // Build the path with the category name and product ID
  const categoryPath = category 
    ? `/${category.name.toLowerCase().replace(/\s+/g, '-')}`
    : "#";

  const fullPath = `${categoryPath}?id=${singleFeature.id}`;

  return (
    <div className="container row">
      <div className="col-md-6 products-img">
        <img src={`${apiUrl}/` + singleFeature.image} alt="" className="h-90" />
      </div>
      <div className="col-md-6 products-info">
        <h5 className="products-feature">Auto Wellness Program</h5>
        <h5 className="company-name">DR.BWC</h5>
        <h5 className="products-title">{singleFeature.type}</h5>
        <p className="product-desc">{singleFeature.description}</p>
        <Link to={fullPath} className="btn btn-primary">View All Products</Link>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeatureIconSingle;
