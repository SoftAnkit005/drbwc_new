import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processCOD, processPayment } from '../../store/slices/payment-slice';
import SEO from '../../components/seo';
import LayoutOne from '../../layouts/LayoutOne';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order } = useSelector(state => state.orders);
    const { loading, success, error } = useSelector(state => state.payments);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery
    const [ccAvenueFormData, setCcAvenueFormData] = useState(null);
    const [currentOrder, setCurrentOrder] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(currentOrder);
  useEffect(() => {
    if (order) {
        setCurrentOrder(order.order);
    }
  }, [order])
  


  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === 'cod') {
        setIsSubmitting(true);
        dispatch(processCOD({ orderId: currentOrder.id }));
    } else if (paymentMethod === 'ccavenue') {
      // Handle CCAvenue payment
      dispatch(processPayment({ orderId: currentOrder?.id }))
        .then((response) => {
          if (response.payload.success) {
            setCcAvenueFormData(response.payload.data); // Form data for CCAvenue
          }
        });
    }
  };

  // Effect to handle redirection after payment success
  useEffect(() => {
      if (isSubmitting && success) {
        setIsSubmitting(false);
        navigate('/order-confirmation', { state: { order } });
      }
  }, [isSubmitting, success])
  

  return (
    <Fragment>
      <SEO titleTemplate="Checkout" description="Checkout page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <div className='container py-5'>
            <h2 className='heading-xs'>Choose Payment Method</h2>
            <div className='mb-3'>
                <label>
                    <input className='form-check-input me-1' type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => handlePaymentSelection('cod')} />
                    Cash on Delivery
                </label>
                <label>
                    <input className='form-check-input me-1 ms-3' type="radio" value="ccavenue" checked={paymentMethod === 'ccavenue'} onChange={() => handlePaymentSelection('ccavenue')} />
                    Pay via CCAvenue
                </label>
            </div>

            <button className='btn btn-primary' onClick={handlePaymentSubmit} disabled={loading}>
                {loading ? 'Processing...' : 'Submit Payment'}
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {ccAvenueFormData && (
                <form id="ccavenueForm" method="post" action="https://test.ccavenue.com/transaction/transaction.do">
                    {/* Use the response data to fill out the hidden inputs for the CCAvenue payment form */}
                    <input type="hidden" name="order_id" value={ccAvenueFormData.order_id} />
                    <input type="hidden" name="amount" value={ccAvenueFormData.amount} />
                    <input type="hidden" name="merchant_id" value={ccAvenueFormData.merchant_id} />
                    <input type="hidden" name="currency" value={ccAvenueFormData.currency} />
                    {/* Add other required CCAvenue inputs here */}
                    <button type="submit">Proceed to Pay via CCAvenue</button>
                </form>
            )}
        </div>
    </LayoutOne>
    </Fragment>
  );
};

export default PaymentPage;
