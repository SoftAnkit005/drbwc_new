import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/seo';
import LayoutOne from '../../../layouts/LayoutOne';
import { BsFillPatchCheckFill } from 'react-icons/bs';

const SuccessPage = () => {
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
