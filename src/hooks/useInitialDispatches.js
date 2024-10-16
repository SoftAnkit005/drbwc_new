import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/product-slice";
import { fetchCategories } from "../store/slices/category-slice";
import { fetchSubcategories } from "../store/slices/sub-category-slice";
import { fetchOffers } from "../store/slices/coupons-slice";
import { getCart } from "../store/slices/cart-slice";
import { fetchTaxData } from "../store/slices/tax-slice";
import { fetchWishlist } from "../store/slices/wishlist-slice";
import { getTags } from "../store/slices/tags-slice";
import { fetchGuestCart } from "../store/slices/guest-cart-slice";
import { clearToken } from "../store/slices/auth-slice";

// Function to validate token
const isTokenValid = (token) => {
  // Simple check: return false if token is not present
  if (!token) return false;

  // You can add more complex checks here, such as token expiration
  return true;
};

export const useInitialDispatches = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { error } = useSelector((state) => state.userOrders);

  console.log('error', error?.message);


  useEffect(() => {
    // Dispatch global thunks
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSubcategories());
    dispatch(fetchOffers());
    dispatch(fetchTaxData());
    dispatch(getTags());
    dispatch(fetchGuestCart());

    // Conditionally dispatch getCart and fetchWishlist if token is valid
    if (isTokenValid(token) && !error) {
      dispatch(getCart());
      dispatch(fetchWishlist());
    }else{
      console.log('clear token');
      dispatch(clearToken());
    }
  }, [token, dispatch]);
};
