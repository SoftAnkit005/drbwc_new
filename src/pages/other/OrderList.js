import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import OrderStatusModal from "../../components/modals/OrderStatusModal";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../store/slices/user-order-slice";
import { Card, Col, Row } from "react-bootstrap";
import CancelOrderModal from "../../components/modals/CancelOrderModal";
import { PiSealWarningFill } from "react-icons/pi";
import { BsPatchCheckFill } from "react-icons/bs";
import InvoiceDownload from "../../components/order/InvoiceDownload";

const OrderList = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [productsData, setProductsData] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  // Get orders from Redux state
  const { orders, loading, error } = useSelector((state) => state.userOrders);
  const { products } = useSelector((state) => state.product);
  const user = JSON.parse(localStorage.getItem('loggedUser'));

  useEffect(() => {
    if (orders) {
      const sortedData = [...orders].sort((a, b) => new Date(b.id) - new Date(a.id));
      setAllOrders(sortedData);
    } else {
      console.log("No orders found or orders fetching failed.");  // Debugging
    }
  }, [orders]);
  useEffect(() => {
    if (products?.success) {
      setProductsData(products.products);
      console.log('productsData:', products.products);
    } else {
      console.log("No products found or products fetching failed.");  // Debugging
    }
  }, [products]);

  useEffect(() => {
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
          )  : allOrders && allOrders?.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your Order List</h3>

                <div className="row">
                  <div className="col-12">
                    <div className="table-content">
                      {allOrders?.map((orderItem, i) => {
                        const productIds = orderItem.product_id.split(',').map(id => parseInt(id));
                        const quantities = orderItem.qty.split(',').map(qty => parseInt(qty));
                        console.log('orderItem', orderItem);
                        // Find products based on product IDs
                        const orderedProducts = productIds.map(productId => 
                          productsData.find(product => product.id === productId)
                        );

                        return (
                          <Card key={i} className="mb-4">
                            <Card.Header className="d-flex justify-content-between">
                              <div className="d-md-flex gap-5 align-items-center">
                                <div className="mb-2 mb-md-0">
                                  <label className="desc-xs text-muted text-uppercase">Order Placed</label>
                                  <p className="fw-semibold">{new Date(orderItem.order_date).toLocaleDateString()}</p>
                                </div>
                                <div className="mb-2 mb-md-0">
                                  <label className="desc-xs text-muted text-uppercase">Total Amount</label>
                                  <p className="fw-semibold">₹{orderItem.total_amount}</p>
                                </div>
                              </div>
                              <div className="mb-2 mb-md-0 text-end">
                                <label className="desc-xs text-muted text-uppercase">Order Number: <span className="fw-semibold text-dark">{orderItem.order_prefix}</span></label>
                                <div>
                                  <InvoiceDownload orderItem={orderItem} productsData={productsData} />
                                </div>
                              </div>
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                <Col md={9}>
                                  <div className="order-item">
                                    <p className="text-capitalize"> {(orderItem.status).split('-').join(' ')}</p>

                                    <div className="product-list mt-3">
                                      <ul>
                                        {orderedProducts.map((product, index) => (
                                          product ? (
                                            <li className="mb-2" key={index}>
                                              <img className="me-2" src={JSON.parse(product.image_urls)[0]} alt={product.product_name} width={50} height={50} />
                                              Product Name: {product.product_name} x {quantities[index]}
                                            </li>
                                          ) : null // Handle the case if product is not found
                                        ))}

                                      </ul>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={3} className="text-md-end mt-2 mt-md-0">
                                  {orderItem.status === 'canceled' ? (
                                    <>
                                      <span className="text-capitalize text-danger d-md-flex align-items-center justify-content-end"><PiSealWarningFill className="me-1 fs-5" /> Order {orderItem.status}</span>
                                      <p className="text-danger"> Reason: {orderItem.comments} </p>
                                    </>
                                  ) : orderItem.status === 'declined' ? (
                                    <>
                                      <span className="text-capitalize text-danger d-md-flex align-items-center justify-content-end"><PiSealWarningFill className="me-1 fs-5" /> Order {orderItem.status}</span>
                                      <p className="text-danger"> Reason: {orderItem.comments} </p>
                                    </>
                                  ) : orderItem.status === 'delivered' ? (
                                    <>
                                      <span className="text-capitalize text-success d-md-flex align-items-center justify-content-end"><BsPatchCheckFill className="me-1 fs-5" /> Order {orderItem.status}</span>
                                    </>
                                  ) : (
                                    <>
                                      <OrderStatusModal ordersData={orderItem} />
                                      <CancelOrderModal ordersData={orderItem} />
                                    </>
                                  )}
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
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
