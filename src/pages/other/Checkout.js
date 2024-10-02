import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { clearPincodeData, fetchPincodeData } from "../../store/slices/pincode-slice";
import CouponSection from "../../wrappers/coupon-apply/CouponSection";
import { createOrder } from "../../store/slices/order-slice";
import { isTokenValid } from "../../helpers/product";

const Checkout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const { pincodeData, loading: pincodeLoading } = useSelector((state) => state.pincode); // Access pincode state
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [cartData, setCartData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const { taxdata } = useSelector((state) => state.taxes);
  const [taxes, setTaxes] = useState([]);
  const [totalTaxesAmount, setTotalTaxesAmount] = useState(0);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", address: "", address2: "", postcode: "", city: "", state: "", phone: "", email: "", country: "India", });
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const { order } = useSelector((state) => state.orders);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission
  const token = localStorage.getItem("authToken");
  
  useEffect(() => {
    if (taxdata?.success) {
      const sortedActiveTaxes = taxdata.taxes.filter(tax => tax.status === 'active')
      setTaxes(sortedActiveTaxes);
    }
  }, [taxdata]);

  useEffect(() => {
    if (cartItems) {
      setCartData(cartItems);
    }
    if (products) {
      setAllProducts(products.products);
    }
  }, [cartItems, products]);

  useEffect(() => {
    let total = 0;
    cartData.forEach((cartItem) => {
      const product = allProducts?.find((item) => item.id === cartItem.product_id);
      if (product) {
        total += product.price * cartItem.quantity;
      }
    });
    setCartTotalPrice(total);
  }, [cartData, allProducts]);

  useEffect(() => {
    if (formData.postcode.length === 6) { // Assuming pin code length is 6
      dispatch(fetchPincodeData(formData.postcode));
    } else {
      setFormData(prev => ({ ...prev, city: "", state: "" }));
    }

  }, [formData.postcode, dispatch]);

  useEffect(() => {
    if (pincodeData?.city && pincodeData?.state) {
      setFormData(prev => ({
        ...prev,
        city: pincodeData.city,
        state: pincodeData.state
      }));
    }
  }, [pincodeData]);

  useEffect(() => {
    return () => {
      dispatch(clearPincodeData()); // Clear pincode data on component unmount
    };
  }, []);

  useEffect(() => {
    if (taxes.length > 0 && cartData?.length > 0) {
      const totalTaxes = taxes.reduce((acc, tax) => {
        const taxRate = tax.tax_rate || 0;
        const taxAmount = (taxRate / 100) * cartTotalPrice;
        return acc + taxAmount;
      }, 0);
  
      setTotalTaxesAmount(totalTaxes);
    }
  }, [taxes, cartTotalPrice, cartData]);  

  const getProducts = (product_id) => {
    return allProducts?.find((item) => item.id === product_id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.postcode || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const productIds = cartData?.map((item) => item.product_id).join(",");
    const quantities = cartData?.map((item) => item.quantity).join(",");
    const taxlist = taxes?.map((item) => item.tax_name).join(",");
    const taxid = taxes?.map((item) => item.id).join(",");

    const orderData = {
      order_prefix: "",
      user_id: user.id,
      product_id: productIds,
      qty: quantities,
      tax_id: taxid,
      transaction_id: "",
      payment_method: "",
      customer_phone: formData.phone,
      order_date: new Date().toISOString().split('T')[0], // Current date
      shipping_address: `${formData.address}, ${formData.address2}, ${formData.city}, ${formData.state}, ${formData.country} - ${formData.postcode}`,
      tax: taxlist ,
      total_amount: discountDetails ? (cartTotalPrice + totalTaxesAmount - discountDetails.amount).toFixed(2) : (cartTotalPrice + totalTaxesAmount).toFixed(2),
      discount_id: discountDetails ? discountDetails.couponId : null,
      discount_type: discountDetails ? discountDetails.type : null,
      discount: discountDetails ? discountDetails.amount : null,
      status: "confirmed"
    };

    console.log("Order data:", orderData);
    setIsSubmitting(true);
    dispatch(createOrder(orderData));
  };

  const handleDiscountApplied = (details) => {
    setDiscountDetails(details);
  };

  useEffect(() => {
    if (isSubmitting) {
      if (token && isTokenValid(token) && order?.success) {
        setIsSubmitting(false);
        navigate('/payment', { state: { order } });
      } else {
        navigate('/login-user', { state: { order } });
      }
    }
  }, [token, order, isSubmitting, navigate]);
  

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of Dr BWC."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartData.length > 0 ? (
              <div className="row">
                <div className="col-lg-5">
                  {allProducts && cartData ? 
                    <CouponSection products={allProducts} cartItems={cartData} onDiscountApplied={handleDiscountApplied} />
                    :
                    <></>
                  }
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartData?.map((cartItem, key) => {
                              const product = getProducts(cartItem.product_id);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {product ? product.product_name : "Product Not Found"} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {product ? (product.price * cartItem.quantity).toFixed(2) : "N/A"}
                                  </span>
                                </li>
                              );
                            })}

                            {taxes?.map((tax, key) => (
                              <li key={key}>
                                <span className="order-middle-left text-muted">
                                  {tax.tax_name}
                                </span>{" "}
                                <span className="order-price text-muted">
                                  {tax.tax_rate + '%'}
                                </span>
                              </li>
                            ))}
                            {discountDetails ? 
                              <li>
                                <span className="order-middle-left text-muted">
                                  Coupon Discount
                                </span>{" "}
                                <span className="order-price text-muted">
                                  - {discountDetails.amount}
                                </span>
                              </li>
                            : null}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            {discountDetails ? 
                              <li>{(cartTotalPrice + totalTaxesAmount - discountDetails.amount).toFixed(2)}</li>
                              :
                              <li>{(cartTotalPrice + totalTaxesAmount).toFixed(2)}</li>
                            }
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 mt-3 mt-lg-0">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label className="required">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label className="required">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label className="required">Address Line 1</label>
                            <input className="billing-address" placeholder="House number and street name" type="text" name="address" value={formData.address} onChange={handleChange} required />
                            <label >Address Line 2</label>
                            <input placeholder="Apartment, suite, unit etc." type="text" name="address2" value={formData.address2} onChange={handleChange} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label className="required">Postcode / ZIP</label>
                            <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Town / City</label>
                            <input type="text" name="city" value={formData.city} readOnly placeholder={pincodeLoading ? "Loading..." : ""} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>State / County</label>
                            <input type="text" name="state" value={formData.state} readOnly placeholder={pincodeLoading ? "Loading..." : ""} />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label className="required">Phone</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label className="required">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                          </div>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-end">
                          <button className="btn btn-primary px-5">Place Order</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h4>Your cart is empty.</h4>
                <Link to="/shop" className="btn btn-primary">Return to shop</Link>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
