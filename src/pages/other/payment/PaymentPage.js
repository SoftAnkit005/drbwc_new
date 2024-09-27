import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { processCOD, resetPaymentState } from '../../../store/slices/payment-slice'; // Import the reset action
import SEO from '../../../components/seo';
import LayoutOne from '../../../layouts/LayoutOne';
import axios from "axios";

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { order } = useSelector(state => state.orders);
    const { success, error } = useSelector(state => state.payments);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery
    const [currentOrder, setCurrentOrder] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [paymentData, setPaymentData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const [errorMessage, setErrorMessage] = useState(""); // Handle error message
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        localStorage.removeItem('transactionDispatched');
        setCurrentUser(user);
    }, []);

    // Only update currentOrder if the order is different or payment method changes
    useEffect(() => {
        if (order && order.order && (order.order.id !== currentOrder.id || currentOrder.payment_method !== paymentMethod)) {
            const updatedOrder = {
                ...order.order,
                payment_method: paymentMethod, // Update payment_method based on selection
            };
            setCurrentOrder(updatedOrder);
        }
    }, [order, paymentMethod, currentOrder]); // Make sure to include currentOrder to avoid infinite loops

    // Update paymentData whenever currentOrder is updated
    useEffect(() => {
        if (currentOrder.id) {
            setPaymentData({
                merchant_id: "3787184",
                order_id: currentOrder.order_prefix || currentOrder.id, // Use order_prefix or fallback to id
                amount: currentOrder.total_amount,
                currency: "INR",
                redirect_url: `${apiUrl}/order-cancel`,
                cancel_url: `${apiUrl}/order-success`,
                billing_name: currentUser?.full_name || '',
                billing_email: currentUser?.email || '',
            });
        }
    }, [currentOrder, currentUser]);

    console.log(`${apiUrl}/api/transactions/order-payment`);

    const handlePaymentSelection = (method) => {
        setPaymentMethod(method);
    };

    const handlePaymentSubmit  = async () => {
        if (paymentMethod === 'cod') {
            setIsSubmitting(true);
            dispatch(processCOD({ orderId: currentOrder.id, paymentMethod })); // Include paymentMethod if needed
        } else if (paymentMethod === 'online') {
            setLoading(true); // Start loading

            try {
                // Send request to backend to encrypt the data
                const response = await axios.post(`${apiUrl}/api/transactions/order-payment`,paymentData);
                const { encryptedData } = response.data;

                // Create a form dynamically to send encrypted data to CCAvenue
                const form = document.createElement("form");
                form.method = "POST";
                form.action ="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

                const encRequestField = document.createElement("input");
                encRequestField.type = "hidden";
                encRequestField.name = "encRequest";
                encRequestField.value = encryptedData;
                form.appendChild(encRequestField);

                const accessCodeField = document.createElement("input");
                accessCodeField.type = "hidden";
                accessCodeField.name = "access_code";
                accessCodeField.value = "AVUS15LH05CE64SUEC"; // Replace with your actual access code
                form.appendChild(accessCodeField);

                document.body.appendChild(form);
                form.submit();
            } catch (error) {
                console.error("Error during payment process:", error);
                setErrorMessage("Failed to process payment. Please try again.");
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    console.log('paymentData:', paymentData);

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
                        <label className='ms-3'>
                            <input className='form-check-input me-1' type="radio" value="online" checked={paymentMethod === 'online'} onChange={() => handlePaymentSelection('online')} />
                            CC Avenue
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
