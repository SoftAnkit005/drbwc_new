import PropTypes from "prop-types";
import { useState } from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ subcategories, getSortParams }) => {
  const [activeSubcategory, setActiveSubcategory] = useState(""); // Default to "all"

  const handleCategoryClick = (name, id, e) => {
    setActiveSubcategory(id);
    getSortParams(name, id);
    setActiveSort(e);
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Sub Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {subcategories ? (
          <ul>
            {/* "All Subcategories" button */}
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className={activeSubcategory === "" ? "active" : ""}
                  onClick={(e) => handleCategoryClick("all", "", e)}
                >
                  <span className="checkmark" /> All Subcategories
                </button>
              </div>
            </li>

            {/* Subcategories list */}
            {subcategories.map((item, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className={activeSubcategory === item.id ? "active" : ""}
                      onClick={(e) => handleCategoryClick(item.name, item.id, e)}
                    >
                      <span className="checkmark" /> {item.name}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  subcategories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
