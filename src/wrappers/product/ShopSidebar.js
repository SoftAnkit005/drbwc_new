import PropTypes from "prop-types";
import clsx from "clsx";
import ShopCategories from "../../components/product/ShopCategories";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/category-slice";
import { useEffect, useState } from "react";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.success) {
      const sortedCategories = [...categories.categories].sort((a, b) => a.position - b.position);
      setCategoryData(sortedCategories);
    }
  }, [categories]);

  const uniqueCategories = categoryData.map(item => ({ id: item.id, name: item.name.toLowerCase() }));

  return (
    <div className={clsx("sidebar-style", sideSpaceClass)}>
      
      {/* filter by categories */}
      <ShopCategories categories={uniqueCategories} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
