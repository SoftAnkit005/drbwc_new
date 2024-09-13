import PropTypes from "prop-types";
import clsx from "clsx";
import ShopCategories from "../../components/product/ShopCategories";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const { subcategories } = useSelector((state) => state.subcategories);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryData, setsubcategoryData] = useState([])
  const params = new URLSearchParams(window.location.search);
  const [filterSub, setfilterSub] = useState([]);

  useEffect(() => {
    if (categoryId) {
      const filteredSubcategories = subcategoryData.filter(subcategory => subcategory.category_id === Number(categoryId));
      setfilterSub(filteredSubcategories);
    } else {
      setfilterSub([]);
    }
  }, [categoryId, subcategoryData]);


  useEffect(() => {
    const id = params.get('id');
    setCategoryId(id);
  }, [params]);

  useEffect(() => {
    if (subcategories?.success) {
      setsubcategoryData(subcategories.subcategories);
    }
  }, [subcategories]);



  return (
    <div className={clsx("sidebar-style", sideSpaceClass)}>
      <ShopCategories subcategories={filterSub} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
