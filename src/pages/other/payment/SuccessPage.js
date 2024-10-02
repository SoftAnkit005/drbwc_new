import React, { Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SEO from '../../../components/seo';
import LayoutOne from '../../../layouts/LayoutOne';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { createTransaction } from '../../../store/slices/transaction-slice';

const SuccessPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orderConfirmed = location.state || {};

    const transactionData = {
        order_id: orderConfirmed.order?.id,
        transaction_id: orderConfirmed.order?.payment_method === 'cod' ? 'cod' : 'online',
        transaction_date: orderConfirmed.order?.updated_at,
        payment_response: JSON.stringify({ 
            status: orderConfirmed.status ? 'success' : 'failed', 
            amount: orderConfirmed.order?.total_amount
        }),
        status: orderConfirmed.status ? 'success' : 'failed',
    };

    useEffect(() => {
        const hasDispatched = localStorage.getItem('transactionDispatched');
        // Dispatch createTransaction only if the order is confirmed and it hasn't been dispatched before
        if (orderConfirmed && !hasDispatched) {
            dispatch(createTransaction(transactionData));
            localStorage.setItem('transactionDispatched', 'true'); // Set flag in local storage
        }
    }, [orderConfirmed, dispatch, transactionData]);

    return (
        <Fragment>
            <SEO titleTemplate="Order Confirmation" description="Your order has been confirmed." />
            <LayoutOne headerTop="visible">
                <div className="container py-5 text-center">
                    <div>
                        <h1 className='d-flex align-items-center justify-content-center text-success'><BsFillPatchCheckFill className='me-1'/> Thank You for Your Order!</h1>
                        <p className='text-theme-brown desc-md'>Your order is confirmed!</p>
                        <p>Your order hasn't shipped yet, but we'll notify you when it does.</p>
                        <Link className="btn btn-primary" to={process.env.PUBLIC_URL + "/"}> Continue Shopping </Link>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default SuccessPage;
