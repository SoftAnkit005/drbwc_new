import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { addToCart, removeFromCart } from "../../../store/slices/cart-slice";

const MenuCart = () => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const [productsData, setProductsData] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const dispatch = useDispatch();
  const [allCart, setAllCart] = useState([]);
  let cartTotalPrice = 0;
  const token = localStorage.getItem("authToken");

  // Function to load cart from session storage
  const loadCartFromSession = () => {
    const sessionCart = sessionStorage.getItem("cart");
    return sessionCart ? JSON.parse(sessionCart) : [];
  };

  useEffect(() => {
    if (products?.success && Array.isArray(products.products)) {
      setProductsData(products.products);
    } else {
      console.log("No products found or products fetching failed.");  // Debugging
    }
  }, [products]);

  useEffect(() => {
    if (token) {
      // Load cart items from API when authenticated
      if (cartItems.success) {
        const uniqueCartItems = cartItems.cartItems?.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.product_id === item.product_id)
        );
        setAllCart(uniqueCartItems);

        const initialQuantities = {};
        uniqueCartItems.forEach((item) => {
          initialQuantities[item.id] = item.quantity;
        });
        setItemQuantities(initialQuantities);
      }
    } else {
      // Load cart from session storage
      const sessionCartItems = loadCartFromSession();
      setAllCart(sessionCartItems);

      const initialQuantities = {};
      sessionCartItems.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });
      setItemQuantities(initialQuantities);
    }
  }, [cartItems, token]);

  // Save cart to session storage
  const saveCartToSession = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  // Handle quantity change
  const handleQty = (type, item) => {
    setItemQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };

      if (type === "plus") {
        newQuantities[item.id] = Math.min(newQuantities[item.id] + 1, 4);
      } else if (type === "minus") {
        newQuantities[item.id] = Math.max(newQuantities[item.id] - 1, 0);
      }

      if (newQuantities[item.id] < 1) {
        if (token) {
          dispatch(removeFromCart({ product_id: item.product_id }));
        } else {
          const updatedCart = allCart.filter(
            (cartItem) => cartItem.product_id !== item.product_id
          );
          setAllCart(updatedCart);
          saveCartToSession(updatedCart);
        }
        console.log("Delete");
      } else {
        console.log("Add");
        const payload = {
          product_id: item.product_id,
          quantity: newQuantities[item.id],
          color: item.color || "", // Add color if available
        };

        if (token) {
          // Update the cart via API if authenticated
          dispatch(addToCart(payload));
        } else {
          // Update the cart in session storage
          const updatedCart = allCart.map((cartItem) =>
            cartItem.product_id === item.product_id
              ? { ...cartItem, quantity: newQuantities[item.id] }
              : cartItem
          );
          setAllCart(updatedCart);
          saveCartToSession(updatedCart);
        }
      }

      return newQuantities;
    });
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
                    finalDiscountedPrice * itemQuantities[item.id])
                : (cartTotalPrice += finalProductPrice * itemQuantities[item.id]);

              const itemImageUrls =
                item.color && colorImageUrls[item.color]
                  ? colorImageUrls[item.color]
                  : imageUrls;

              return (
                <li className="single-shopping-cart" key={index}>
                  <div className="shopping-cart-img">
                    <Link
                      to={process.env.PUBLIC_URL + "/product/" + product.id}
                    >
                      <img
                        alt={product.product_name}
                        src={itemImageUrls[0] || "/default-image.jpg"}
                        className="img-fluid"
                        style={{ height: "65px" }}
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4 className="desc-xs fw-semibold">
                      <Link
                        to={process.env.PUBLIC_URL + "/product/" + product.id}
                      >
                        {product.product_name}
                      </Link>
                    </h4>

                    <div className="d-flex align-items-center">
                      <button
                        onClick={() => handleQty("minus", item)}
                        className="btn btn-sm btn-primary text-dark desc-lg me-2"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <h6 className="desc-xxs text-theme-red fw-semibold m-0">
                        {itemQuantities[item.id]}
                      </h6>
                      <button
                        onClick={() => handleQty("plus", item)}
                        className="btn btn-sm btn-primary text-dark desc-lg ms-2"
                        disabled={itemQuantities[item.id] >= 4}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>

                    <h6 className="desc-xxs">
                      ₹{" "}
                      {discountedPrice != null
                        ? finalDiscountedPrice
                        : finalProductPrice}
                    </h6>
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
            <Link className="default-btn" to={"/checkout"}>
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
