import React, { Fragment} from 'react';
import SEO from '../../components/seo';
import LayoutOne from '../../layouts/LayoutOne';

const OrderConfirmation = () => {
    

  return (
    <Fragment>
      <SEO titleTemplate="Checkout" description="Checkout page of Dr BWC." />
      <LayoutOne headerTop="visible">
        <h1>Confirmed</h1>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderConfirmation;
