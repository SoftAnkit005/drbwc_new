import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart } from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";

const Cart = () => {
  const [itemQuantities, setItemQuantities] = useState({});
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    // Initialize local state with cart items quantities
    const initialQuantities = cartItems.reduce((acc, item) => {
      acc[item.product_id] = item.quantity;
      return acc;
    }, {});
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  const handleQuantityChange = (type, product_id) => {
    setItemQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[product_id] || 1;
      let newQuantity = currentQuantity;

      if (type === "plus") {
        newQuantity = Math.min(currentQuantity + 1, 4); // Max 4
      } else if (type === "minus") {
        newQuantity = Math.max(currentQuantity - 1, 1); // Min 1
      }

      // Dispatch addToCart with updated quantity
      dispatch(addToCart({ product_id, quantity: newQuantity }));

      return {
        ...prevQuantities,
        [product_id]: newQuantity,
      };
    });
  };

  let cartTotalPrice = 0;

  return (
    <Fragment>
      <SEO titleTemplate="Cart" description="Cart page" />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="cart-main-area pt-50 pb-50">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem) => {
                            const product = cartItem.Product;
                            const imageUrls = JSON.parse(product.image_urls || "[]");

                            const productPrice = product.price ? product.price : 0;
                            const finalProductPrice = productPrice.toFixed(2);

                            const quantity = itemQuantities[cartItem.product_id] || cartItem.quantity;
                            cartTotalPrice += productPrice * quantity;

                            return (
                              <tr key={cartItem.product_id}>
                                <td className="product-thumbnail">
                                  <Link to={`/product/${product.id}`}>
                                    <img
                                      className="img-fluid"
                                      src={imageUrls[0] || "path/to/default-image.jpg"}
                                      alt={product.product_name}
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link to={`/product/${product.id}`}>
                                    {product.product_name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  <span className="amount">{"INR " + finalProductPrice}</span>
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() => handleQuantityChange("minus", cartItem.product_id)}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => handleQuantityChange("plus", cartItem.product_id)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>

                                <td className="product-subtotal">
                                  {"INR " + (finalProductPrice * quantity).toFixed(2)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall mb-4">
                      <h4 className="cart-bottom-title section-bg-gary-cart"> Apply Coupon Code </h4>

                      <input className="form-control form-control-sm mb-2 " type="text" placeholder="Coupon code" />
                      <button className="px-5 border-0">Apply</button>
                    </div>
                    <div className="grand-totall">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                      <h5>
                        Total products{" "}
                        <span>{"INR " + cartTotalPrice.toFixed(2)}</span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>{"INR " + cartTotalPrice.toFixed(2)}</span>
                      </h4>
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to="/shop-grid-standard">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
