import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ subcategories, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {subcategories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button onClick={e => { getSortParams("subcategory", ""); setActiveSort(e); }} >
                  <span className="checkmark" /> All Subcategories
                </button>
              </div>
            </li>
            {subcategories.map((item, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button onClick={e => { getSortParams(item.name, item.id); setActiveSort(e); }} >
                      {" "}
                      <span className="checkmark" /> {item.name}{" "}
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
