import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../store/slices/category-slice";
import { useEffect, useState } from "react";
// import { fetchSubcategories } from "../../store/slices/sub-category-slice";

const apiUrl = process.env.REACT_APP_API_URL;

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const location = useLocation(); // Get the current location (URL)

  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   dispatch(fetchSubcategories());
  // }, [dispatch]);

  useEffect(() => {
    if (categories?.success) {
      const sortedCategories = [...categories.categories].sort((a, b) => a.position - b.position);
      setCategoryData(sortedCategories);
    }
    if (subcategories?.success) {
      setSubcategoriesData(subcategories.subcategories || []);
    }
  }, [categories, subcategories]);

  const filteredSubcategories = (categoryId) => {
    return subcategoriesData?.filter((subcategory) => subcategory.category_id === categoryId) || [];
  };

  const isActive = (path) => {
    return location.pathname === path; // Check if current path matches the given path
  };

  return (
    <div className={clsx(sidebarMenu ? "sidebar-menu" : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)} >
      <nav>
        <ul>
          {categoryData?.map((category) => {
            const categoryPath = `/${category.name.toLowerCase().replace(/\s+/g, '-')}`;
            const categoryPathWithId = `${categoryPath}?id=${category.id}`;
            return (
              <li key={category.id} className={clsx(isActive(categoryPath) ? "active" : "")}>
                <Link to={categoryPathWithId}>
                  {category.name}
                  {filteredSubcategories(category.id).length > 0 && (
                    <i className="fa fa-angle-down ms-1" />
                  )}
                </Link>
                {filteredSubcategories(category.id).length > 0 && (
                  <ul className="submenu">
                    {filteredSubcategories(category.id).map((subcategory) => {
                      const subcategoryPath = `${categoryPath}?id=${category.id}&subcat=${subcategory.id}`;
                      return (
                        <li key={subcategory.id} className={clsx(isActive(subcategoryPath) ? "active" : "")}>
                          <Link to={subcategoryPath}>
                            {subcategory.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
          <li>
            <Link to={`${apiUrl}` + "/corporate-gifts"}>
              Corporate Gifts
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
