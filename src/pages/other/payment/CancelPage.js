import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/seo';
import LayoutOne from '../../../layouts/LayoutOne';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { PiSealWarningFill } from 'react-icons/pi';

const CancelPage = () => {
    return (
        <Fragment>
            <SEO titleTemplate="Order Confirmation" description="Your order has been confirmed." />
            <LayoutOne headerTop="visible">
                <div className="container py-5 text-center">
                    <div>
                        <h1 className='d-flex align-items-center justify-content-center text-danger'><PiSealWarningFill className='me-1'/> Order Not Confirmed!</h1>
                        <p className='text-theme-brown desc-md'>Unfortunately, your order could not be confirmed.</p>
                        <p>Please check your order status or contact support.</p>
                        <Link className="btn btn-primary" to={process.env.PUBLIC_URL + "/"}> Continue Shopping </Link>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default CancelPage;
