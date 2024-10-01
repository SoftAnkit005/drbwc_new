import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import OrderStatusModal from "../../components/modals/OrderStatusModal";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../store/slices/user-order-slice";
import { Col, Row } from "react-bootstrap";
import CancelOrderModal from "../../components/modals/CancelOrderModal";

const OrderList = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [productsData, setProductsData] = useState([]);

  // Get orders from Redux state
  const { orders, loading, error } = useSelector((state) => state.userOrders);
  const { products } = useSelector((state) => state.product);
  const user = JSON.parse(localStorage.getItem('loggedUser'));

  console.log(user);

  useEffect(() => {
    if (products?.success) {
      setProductsData(products.products);
      console.log('productsData:', products.products);
    } else {
      console.log("No products found or products fetching failed.");  // Debugging
    }
  }, [products]);


  useEffect(() => {
    // Fetch orders for user with ID 1 (or replace with dynamic user ID)
    dispatch(fetchUserOrders(user?.id));
  }, [dispatch]);

  return (
    <Fragment>
      <SEO titleTemplate="Order List" description="Order list page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Order List", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="cart-main-area pt-50 pb-50">
          <div className="container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="row">
              <div className="col-lg-12 text-center">
                <p>Error: {error.message || "An unknown error occurred."}</p>
              </div>
            </div>
          )  : orders && orders.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your Order List</h3>

                <div className="row">
                  <div className="col-12">
                    <div className="table-content">
                      {orders.map((orderItem, i) => {
                        const productIds = orderItem.product_id.split(',').map(id => parseInt(id));
                        const quantities = orderItem.qty.split(',').map(qty => parseInt(qty));
                        
                        // Find products based on product IDs
                        const orderedProducts = productIds.map(productId => 
                          productsData.find(product => product.id === productId)
                        );

                        return (
                          <>
                          <Row key={i} className=" rounded mb-4 border p-3">
                            <Col md={9}>
                              <div key={orderItem.id} className="order-item">
                                <p><strong>Order Date:</strong> {new Date(orderItem.order_date).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {orderItem.status}</p>
                                <p><strong>Total Amount:</strong> ₹{orderItem.total_amount}</p>

                                <div className="product-list mt-3">
                                  <h5><strong>Products:</strong></h5>
                                  <ul className="ms-4">
                                    {orderedProducts.map((product, index) => (
                                      product ? (
                                        <li key={index}>
                                          <img src={JSON.parse(product.image_urls)[0]} alt={product.product_name} width={50} height={50} />
                                          Product Name: {product.product_name} x {quantities[index]}
                                        </li>
                                      ) : null // Handle the case if product is not found
                                    ))}

                                  </ul>
                                </div>
                              </div>
                            </Col>
                            <Col md={3} className="text-md-end mt-2 mt-md-0">
                              {orderItem.status !== 'canceled' ?
                              <>
                                <OrderStatusModal ordersData={orderItem}/>
                                <CancelOrderModal ordersData={orderItem}/>
                              </>
                              :
                              <>
                                <span className="text-capitalize text-danger">Order {orderItem.status}</span>
                                <p className="text-capitalize text-danger">Reason: {(orderItem.comments).split('-').join(' ')}</p>
                              </>}
                            </Col>
                          </Row>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + "/"}> Continue Shopping </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-box1"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No orders found <br />
                      <Link to={process.env.PUBLIC_URL + "/"}>Continue Shopping</Link>
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

export default OrderList;
