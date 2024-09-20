import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../../store/slices/category-slice";
import { fetchSubcategories } from "../../../store/slices/sub-category-slice";

const MobileNavMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { subcategories } = useSelector((state) => state.subcategories);
  const [categoryData, setCategoryData] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
  }, [dispatch]);

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

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        {categoryData?.map((category) => {
          const categoryPath = `${process.env.PUBLIC_URL}/${category.name.toLowerCase().replace(/\s+/g, '-')}`;
          const categoryPathWithId = `${categoryPath}?id=${category.id}`;
          return (
            <li key={category.id} className="menu-item-has-children">
              <Link to={categoryPathWithId}>
                {t(category.name)}
              </Link>
              {filteredSubcategories(category.id).length > 0 && (
                <ul className="sub-menu">
                  {filteredSubcategories(category.id).map((subcategory) => {
                    const subcategoryPath = `${categoryPath}?id=${category.id}&subcat=${subcategory.id}`;
                    return (
                      <li key={subcategory.id}>
                        <Link to={subcategoryPath}>
                          {t(subcategory.name)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
