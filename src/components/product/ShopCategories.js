import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ subcategories, getSortParams }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSubcategory, setActiveSubcategory] = useState(""); // Default to "All Subcategories"

  // Extract subcat from the URL query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subcat = searchParams.get("subcat");

    if (subcat) {
      setActiveSubcategory(subcat);
    } else {
      setActiveSubcategory(""); // Default to "All Subcategories"
    }
  }, [location.search]);

  // Set active sort and call getSortParams based on active subcategory
  useEffect(() => {
    if (activeSubcategory !== "") {
      const selectedSubcategory = subcategories.find(
        (item) => item.id.toString() === activeSubcategory
      );

      if (selectedSubcategory) {
        getSortParams(selectedSubcategory.name, selectedSubcategory.id);
      } else {
        getSortParams("all", ""); // For "All Subcategories"
      }
    } else {
      getSortParams("all", ""); // Handle the case for "All Subcategories"
    }

    setActiveSort(activeSubcategory);
  }, [activeSubcategory, subcategories, getSortParams]);

  const handleCategoryClick = (name, id, e) => {
    // Update the URL with the selected subcategory
    navigate({
      search: new URLSearchParams({
        ...Object.fromEntries(new URLSearchParams(location.search)),
        subcat: id
      }).toString()
    });
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Sub Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {subcategories ? (
          <ul>
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
            {subcategories.map((item, key) => (
              <li key={key}>
                <div className="sidebar-widget-list-left">
                  <button
                    className={activeSubcategory === item.id.toString() ? "active" : ""}
                    onClick={(e) => handleCategoryClick(item.name, item.id, e)}
                  >
                    <span className="checkmark" /> {item.name}
                  </button>
                </div>
              </li>
            ))}
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
  getSortParams: PropTypes.func,
};

export default ShopCategories;
