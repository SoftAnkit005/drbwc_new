import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart } from "../../store/slices/cart-slice";
import CouponSection from "../../wrappers/coupon-apply/CouponSection";

const Cart = () => {
  const [itemQuantities, setItemQuantities] = useState({});
  const [totalTaxesAmount, setTotalTaxesAmount] = useState(0);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const { taxdata } = useSelector((state) => state.taxes);
  const [productsData, setProductsData] = useState([]);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [taxes, setTaxes] = useState([]);

  useEffect(() => {
    if (taxdata?.success) {
      setTaxes(taxdata.taxes);
    }
  }, [taxdata]);

  console.log('taxes', taxes);

  useEffect(() => {
    if (products?.success && Array.isArray(products.products)) {
      setProductsData(products.products);
    } else {
      console.log("No products found or products fetching failed.", products);
    }
  }, [products]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setLocalCartItems(cartItems);
    } else {
      const storedCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
      setLocalCartItems(storedCartItems);
    }

    const initialQuantities = localCartItems.reduce((acc, item) => {
      acc[item.product_id] = item.quantity;
      return acc;
    }, {});
    setItemQuantities(initialQuantities);
  }, [cartItems]);

  useEffect(() => {
    if (taxes.length > 0 && localCartItems.length > 0) {
      const totalTaxes = taxes.reduce((acc, tax) => {
        const taxRate = tax.tax_rate || 0;
        const taxAmount = (taxRate / 100) * cartTotalPrice;
        return acc + taxAmount;
      }, 0);

      setTotalTaxesAmount(totalTaxes);
    }
  }, [taxes, localCartItems]);

  const handleQuantityChange = (type, product_id) => {
    setItemQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[product_id] || 1;
      let newQuantity = currentQuantity;

      if (type === "plus") {
        newQuantity = Math.min(currentQuantity + 1, 4);
      } else if (type === "minus") {
        newQuantity = Math.max(currentQuantity - 1, 1);
      }

      dispatch(addToCart({ product_id, quantity: newQuantity }));

      const updatedCartItems = localCartItems.map((item) =>
        item.product_id === product_id ? { ...item, quantity: newQuantity } : item
      );

      if (!localStorage.getItem("authToken")) {
        sessionStorage.setItem('cart', JSON.stringify(updatedCartItems));
      }

      return {
        ...prevQuantities,
        [product_id]: newQuantity,
      };
    });
  };

  const getProductDetails = (product_id) => {
    return productsData.find(product => product.id === product_id) || {};
  };

  let cartTotalPrice = 0;

  console.log(totalTaxesAmount);

  const calculateDiscountedTotal = (totalPrice, discount) => {
    if (!discount || discount.amount === "0") return { discountedPrice: totalPrice, discountAmount: 0 };

    let discountedPrice = totalPrice;
    let discountAmount = 0;

    if (discount.type === 'percentage') {
      discountAmount = totalPrice * (parseFloat(discount.value) / 100);
      discountedPrice = totalPrice - discountAmount;
    } else if (discount.type === 'fixed') {
      discountAmount = parseFloat(discount.amount);
      discountedPrice = Math.max(totalPrice - discountAmount, 0);
    }

    return { discountedPrice, discountAmount };
  };

  cartTotalPrice = localCartItems.reduce((acc, item) => {
    const product = getProductDetails(item.product_id);
    const productPrice = product.price ? parseFloat(product.price) : 0;
    const quantity = itemQuantities[item.product_id] || item.quantity;
    return acc + (productPrice * quantity);
  }, 0);

  const { discountedPrice = 0, discountAmount = 0 } = calculateDiscountedTotal(cartTotalPrice, discountDetails);

  const handleDiscountApplied = (details) => {
    setDiscountDetails(details);
  };

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
            {localCartItems && localCartItems.length >= 1 ? (
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
                          {localCartItems.map((cartItem) => {
                            const product = getProductDetails(cartItem.product_id);
                            const imageUrls = JSON.parse(product.image_urls || "[]");
                            const productPrice = product.price ? parseFloat(product.price) : 0;
                            const finalProductPrice = productPrice.toFixed(2);
                            const quantity = itemQuantities[cartItem.product_id] || cartItem.quantity;

                            return (
                              <tr key={cartItem.product_id}>
                                <td className="product-thumbnail">
                                  <Link to={`/product/${product.id}`}>
                                    <img className="img-fluid" src={imageUrls[0] || "path/to/default-image.jpg"} alt={product.product_name} />
                                  </Link>
                                </td>
                                <td className="product-name">
                                  <Link to={`/product/${product.id}`}>{product.product_name}</Link>
                                </td>
                                <td className="product-price-cart">
                                  <span className="amount">{"₹ " + finalProductPrice}</span>
                                </td>
                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button className="dec qtybutton" onClick={() => handleQuantityChange("minus", cartItem.product_id)}>-</button>
                                    <input className="cart-plus-minus-box" type="text" value={quantity} readOnly />
                                    <button className="inc qtybutton" onClick={() => handleQuantityChange("plus", cartItem.product_id)}>+</button>
                                  </div>
                                </td>
                                <td className="product-subtotal">{"₹ " + (finalProductPrice * quantity).toFixed(2)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                    <CouponSection products={productsData} cartItems={localCartItems} onDiscountApplied={handleDiscountApplied} />
                    <div className="grand-totall">
                      <h4 className="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                      <h5>Total products <span>{"₹ " + cartTotalPrice.toFixed(2)}</span></h5>
                      {discountAmount > 0 && (
                        <p className="d-flex justify-content-between text-muted desc-xs mb-1">Item Discount <span>{"- " + discountAmount.toFixed(2)}</span></p>
                      )}
                      {taxes?.map((tax) => {
                        // Calculate tax amount
                        const taxAmount = (tax.tax_rate / 100) * cartTotalPrice;
                        return (
                          <p className="d-flex justify-content-between text-muted desc-xs text-capitalize mb-1" key={tax.id}>
                            {tax.tax_name} <span>{tax.tax_rate + '%'}</span>
                          </p>
                        );
                      })}
                      <h4 className="grand-totall-title">Grand Total <span>₹ {(discountedPrice + totalTaxesAmount).toFixed(2)}</span></h4>
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
                      <Link to={process.env.PUBLIC_URL + "/shop"}>Shop Now</Link>
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
