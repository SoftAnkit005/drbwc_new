import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice, isTokenValid } from "../../../helpers/product";
import { addToCart, removeFromCart } from "../../../store/slices/cart-slice";
import cogoToast from "cogo-toast";
import { addToGuestCart, removeFromGuestCart } from "../../../store/slices/guest-cart-slice";

const MenuCart = () => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const guestCartItems = useSelector((state) => state.guestCart.cartItems);
  const { products } = useSelector((state) => state.product);
  const [productsData, setProductsData] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();
  const [allCart, setAllCart] = useState([]);
  let cartTotalPrice = 0;
  const token = localStorage.getItem("authToken");
  

  useEffect(() => {
    if (products?.success && Array.isArray(products.products)) {
      setProductsData(products.products);
    }
  }, [products]);


  useEffect(() => {
    if (token && isTokenValid(token)) {
      // Authenticated user: load cart items from Redux store (cartItems)
      if (cartItems) {
        const uniqueCartItems = cartItems?.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.product_id === item.product_id)
        );
        setAllCart(uniqueCartItems);
  
        const initialQuantities = {};
        uniqueCartItems.forEach((item) => {
          initialQuantities[item.product_id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
      }
    } else {
      // Guest user: load cart items from guestCartSlice
      if (guestCartItems) {
        const uniqueGuestCartItems = guestCartItems?.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.product_id === item.product_id)
        );
        setAllCart(uniqueGuestCartItems);
  
        const initialQuantities = {};
        uniqueGuestCartItems.forEach((item) => {
          initialQuantities[item.product_id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
      }
    }
  }, [cartItems, guestCartItems.length, token]);
  
  

  // Save cart to session storage
  const saveCartToSession = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };


  // Handle quantity change
 const handleQty = (type, item, product_qty) => {
  const currentQuantity = itemQuantities[item.product_id] || 0;
  let updatedQuantity = currentQuantity;

  // Determine the maximum quantity based on product_qty or default to 4
  const maxQuantity = Math.min(product_qty, 4);

  if (type === "plus") {
    if (currentQuantity >= maxQuantity) {
      console.log("Max quantity reached:", currentQuantity); // Debug log
      // Show warning if max quantity is reached
      cogoToast.warn("Max quantity reached", { position: "top-right" });
      return; // Exit early to prevent further updates
    }
    updatedQuantity = Math.min(currentQuantity + 1, maxQuantity);
  } else if (type === "minus") {
    updatedQuantity = Math.max(currentQuantity - 1, 0);
  }

  if (updatedQuantity < 1) {
    if (token && isTokenValid(token)) {
      // Authenticated user: remove from cart
      dispatch(removeFromCart({ product_id: item.product_id }));
    } else {
      // Guest user: remove from guest cart
      dispatch(removeFromGuestCart({ product_id: item.product_id }));
    }
  } else {
    const payload = {
      product_id: item.product_id,
      quantity: updatedQuantity,
      color: item.color || "", // Add color if available
    };
  
    if (token && isTokenValid(token)) {
      // Authenticated user: update cart
      dispatch(addToCart(payload));
    } else {
      // Guest user: update guest cart
      dispatch(addToGuestCart(payload));
    }
  }
  

  // Update the quantity state for this specific item
  setItemQuantities((prevQuantities) => ({
    ...prevQuantities,
    [item.product_id]: updatedQuantity,
  }));
};

  

  // Find product details by product_id
  const getProductDetails = (productId) => {
    return productsData.find((product) => product.id === productId);
  };

  return (
    <div className="shopping-cart-content">
      {allCart && allCart.length > 0 ? (
        <Fragment>
          <ul>
            {allCart.map((item, index) => {
              const product = getProductDetails(item.product_id);

              // Ensure product is defined before accessing its properties
              if (!product) {
                return null;
              }

              const imageUrls = product.image_urls
                ? JSON.parse(product.image_urls)
                : [];
              const colorImageUrls = product.color_image_urls
                ? JSON.parse(product.color_image_urls)
                : {};
              const discountedPrice = getDiscountPrice(
                product.price,
                product.discount
              );
              const finalProductPrice = (
                product.price * currency.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice +=
                  finalDiscountedPrice * itemQuantities[item.product_id])
                : (cartTotalPrice += finalProductPrice * itemQuantities[item.product_id]);

              const itemImageUrls =
                item.color && colorImageUrls[item.color]
                  ? colorImageUrls[item.color]
                  : imageUrls;

              return (
                <li className="single-shopping-cart" key={index}>
                  <div className="shopping-cart-img">
                    <Link to={"/product/" + product.id}>
                      <img alt={product.product_name} src={apiUrl +'/'+ itemImageUrls[0] || "/default-image.jpg"} className="img-fluid" style={{ height: "65px" }} />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4 className="desc-xs fw-semibold">
                      <Link className="ellipsis-two-lines" to={"/product/" + product.id} title={product.product_name} data-bs-toggle="tooltip">
                        {product.product_name}
                      </Link>
                    </h4>

                    <div className="d-flex align-items-center">
                      <button onClick={() => handleQty("minus", item, product.qty)} className="btn btn-sm btn-primary text-dark desc-lg me-2"> - </button>
                      <h6 className="desc-xxs text-theme-red fw-semibold m-0">
                        {itemQuantities[item.product_id]}
                      </h6>
                      <button onClick={() => handleQty("plus", item, product.qty)} className={`btn btn-sm btn-primary desc-lg ms-2 ${itemQuantities[item.product_id] >= Math.min(product.qty, 4) ? "text-secondary" : "text-dark"}`}>+</button>
                    </div>

                    <h6 className="desc-xxs"> ₹ {discountedPrice != null ? finalDiscountedPrice : finalProductPrice} </h6>
                    {item.color ? (
                      <div className="cart-item-variation lh-sm">
                        <span className="desc-xxs lh-sm">
                          Color: {item.color}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">₹ {cartTotalPrice.toFixed(2)}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              view cart
            </Link>
            <Link className="default-btn" to={token && isTokenValid(token) ? "/checkout" : "/login-user"}>
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;
