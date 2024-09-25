import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processCOD, resetPaymentState } from '../../store/slices/payment-slice'; // Import the reset action
import SEO from '../../components/seo';
import LayoutOne from '../../layouts/LayoutOne';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order } = useSelector(state => state.orders);
    const { loading, success, error } = useSelector(state => state.payments);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery
    const [currentOrder, setCurrentOrder] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      localStorage.removeItem('transactionDispatched');
    }, []);

    useEffect(() => {
        if (order) {
            // Create a copy of the order and update the payment_method
            const updatedOrder = {
                ...order.order,
                payment_method: paymentMethod, // Update payment_method based on selection
            };
            setCurrentOrder(updatedOrder);
        }
    }, [order, paymentMethod]); // Add paymentMethod as a dependency

    const handlePaymentSelection = (method) => {
        setPaymentMethod(method);
    };

    const handlePaymentSubmit = () => {
        if (paymentMethod === 'cod') {
            setIsSubmitting(true);
            dispatch(processCOD({ orderId: currentOrder.id, paymentMethod })); // Include paymentMethod if needed
        }
    };

    // Effect to handle redirection after payment success and reset state
    useEffect(() => {
        if (isSubmitting && success) {
            setIsSubmitting(false);
            navigate('/order-confirmation', { state: { order: currentOrder, status: order.success } }); // Pass updated order
            dispatch(resetPaymentState()); // Reset the payment state after success
        }
    }, [isSubmitting, success, navigate, currentOrder, dispatch]); // Ensure dispatch is included as a dependency

    // Reset payment state on component mount or unmount to avoid carrying over state
    useEffect(() => {
        return () => {
            dispatch(resetPaymentState());
        };
    }, [dispatch]);

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
                    </div>

                    <button className='btn btn-primary' onClick={handlePaymentSubmit} disabled={loading}>
                        {loading ? 'Processing...' : 'Submit Payment'}
                    </button>

                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default PaymentPage;
