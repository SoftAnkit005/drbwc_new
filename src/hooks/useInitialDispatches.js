import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/product-slice";
import { fetchCategories } from "../store/slices/category-slice";
import { fetchSubcategories } from "../store/slices/sub-category-slice";
import { fetchOffers } from "../store/slices/coupons-slice";
import { getCart } from "../store/slices/cart-slice";
import { fetchTaxData } from "../store/slices/tax-slice";
import { fetchWishlist } from "../store/slices/wishlist-slice";

export const useInitialDispatches = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Dispatch global thunks
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
    dispatch(fetchOffers());
    dispatch(fetchTaxData());

    // Conditionally dispatch getCart if token is available
    if (token) {
      dispatch(getCart());
      dispatch(fetchWishlist());
    }
  }, [token, dispatch]);
};
