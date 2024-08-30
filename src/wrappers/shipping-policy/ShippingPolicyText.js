import PropTypes from "prop-types";
import clsx from "clsx";

const ShippingPolicyText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("terms-and-condition", spaceTopClass, spaceBottomClass)}>
      <div className="container px-5">
          <h3 className="page-heading mb-5 text-uppercase">shipping policy</h3>
          <p className="desc-sm text-muted">Bhanusaliwellness (“we” and “us”) is the operator of (https://drbwc.com/) (“Website”). By placing an order through this Website you will be agreeing to the terms below. These are provided to ensure both parties are aware of and agree upon this arrangement to mutually protect and set expectations on our service.</p>

          <h3 className="heading-xs">1. General</h3>
          <p className="desc-sm text-muted">Subject to stock availability. We try to maintain accurate stock counts on our website but from time-to-time there may be a stock discrepancy and we will not be able to fulfill all your items at time of purchase. In this instance, we will fulfill the available products to you, and contact you about whether you would prefer to await restocking of the backordered item or if you would prefer for us to process a refund.</p>
          <hr/>

          <h3 className="heading-xs">2. Shipping Costs</h3>
          <p className="desc-sm text-muted">Shipping costs are calculated during checkout based on weight, dimensions and destination of the items in the order. Payment for shipping will be collected with the purchase. <br/>This price will be the final price for shipping cost to the customer.</p>
          <hr/>

          <h3 className="heading-xs">3. Returns</h3>
          <p className="desc-sm text-muted">
              <h3 className="desc-md fw-semibold">3.1 Return Due To Change Of Mind</h3>
              bhanusaliwellness will happily accept returns due to change of mind as long as a request to return is received by us within 7 days of receipt of item and are returned to us in original packaging, unused and in resellable condition.<br/>Return shipping will be paid at the customers expense and will be required to arrange their own shipping.<br/>Once returns are received and accepted, refunds will be processed to store credit for a future purchase. We will notify you once this has been completed through email.<br/>(bhanusaliwellness) will refund the value of the goods returned but will NOT refund the value of any shipping paid.
              <h3 className="desc-md fw-semibold">3.2 Warranty Returns</h3>
              bhanusaliwellness will happily honor any valid warranty claims, provided a claim is submitted within 90 days of receipt of items.<br/>Customers will be required to pre-pay the return shipping, however we will reimburse you upon successful warranty claim.<br/>Upon return receipt of items for warranty claim, you can expect bhanusaliwellness to process your warranty claim within 7 days.<br/>
              Once warranty claim is confirmed, you will receive the choice of:<br/>
              (a) Refund to your payment method<br/>
              (b) A refund in store credit<br/>
              (c) a replacement item sent to you (if stock is available)
          </p>
          <hr/>

          <h3 className="heading-xs">4. Delivery Terms</h3>
          <p className="desc-sm text-muted">
            The following organizations may link to our Website without prior written approval:<br/>
            <h3 className="desc-md fw-semibold">4.1 Transit Time Domestically</h3>
            In general, domestic shipments are in transit for 2 – 7 days
            <h3 className="desc-md fw-semibold">4.2 Transit time Internationally</h3>
            Generally, orders shipped internationally are in transit for 4 – 22 days. This varies greatly depending on the courier you have selected. We are able to offer a more specific estimate when you are choosing your courier at checkout.
            <h3 className="desc-md fw-semibold">4.3 Change Of Delivery Address</h3>
            Orders placed before 07 AM – CDT (UTC-05) will be dispatched the same day, otherwise, within the next business day.<br/>
            Our warehouse operates on Monday – Friday during standard business hours, except on national holidays at which time the warehouse will be closed. In these instances, we take steps to ensure shipment delays will be kept to a minimum.
            <h3 className="desc-md fw-semibold">4.4 Change Of Delivery Address</h3>
            For change of delivery address requests, we are able to change the address at any time before the order has been dispatched.
            <h3 className="desc-md fw-semibold">4.5 P.O. Box Shipping</h3>
            Bhanusaliwellness will ship to P.O. box addresses using postal services only. We are unable to offer couriers services to these locations.
            <h3 className="desc-md fw-semibold">4.6 Military Address Shipping</h3>
            We are able to ship to military addresses using USPS. We are unable to offer this service using courier services.
            <h3 className="desc-md fw-semibold">4.7 Items Out Of Stock</h3>
            If an item is out of stock, we will wait for the item to be available before dispatching your order. Existing items in the order will be reserved while we await this item.
            <h3 className="desc-md fw-semibold">4.8 Delivery Time Exceeded</h3>
            If delivery time has exceeded the forecasted time, please contact us so that we can conduct an investigation.
          </p>

          <hr/>
          <h3 className="heading-xs">5. Tracking Notifications</h3>
          <p className="desc-sm text-muted">Upon dispatch, customers will receive a tracking link from which they will be able to follow the progress of their shipment based on the latest updates made available by the shipping provider.</p>

          <hr/>
          <h3 className="heading-xs">6. Parcels Damaged In Transit</h3>
          <p className="desc-sm text-muted">If you find a parcel is damaged in-transit, if possible, please reject the parcel from the courier and get in touch with our customer service. If the parcel has been delivered without you being present, please contact customer service with next steps.</p>
          
          <hr/>
          <h3 className="heading-xs">7. Duties & Taxes</h3>
          <p className="desc-sm text-muted">
            <h3 className="desc-md fw-semibold">7.1 Sales Tax</h3>
            Sales tax has already been applied to the price of the goods as displayed on the website
            <h3 className="desc-md fw-semibold">7.2 Import Duties & Taxes</h3>
            Import duties and taxes for international shipments may be liable to be paid upon arrival in destination country. This varies by country, and bhanusaliwellness encourage you to be aware of these potential costs before placing an order with us.<br/> If you refuse to to pay duties and taxes upon arrival at your destination country, the goods will be returned to bhanusaliwellness at the customers expense, and the customer will receive a refund for the value of goods paid, minus the cost of the return shipping. The cost of the initial shipping will not be refunded.
          </p>

          <hr/>
          <h3 className="heading-xs">8. Cancellations</h3>
          <p className="desc-sm text-muted">If you change your mind before you have received your order, we are able to accept cancellations at any time before the order has been dispatched. If an order has already been dispatched, please refer to our refund policy.</p>
          
          <hr/>
          <h3 className="heading-xs">9. Insurance</h3>
          <p className="desc-sm text-muted">Parcels are insured for loss and damage up to the value as stated by the courier.
            <h3 className="desc-md fw-semibold">9.1 Process for parcel damaged in-transit</h3>
            We will process a refund or replacement as soon as the courier has completed their investigation into the claim.
            <h3 className="desc-md fw-semibold">9.2 Process for parcel lost in-transit</h3>
            We will process a refund or replacement as soon as the courier has conducted an investigation and deemed the parcel lost.
          </p>

          <hr/>
          <h3 className="heading-xs">10. Customer service</h3>
          <p className="desc-sm text-muted">For all customer service enquiries, please phone us at +91 9825735973</p>
      </div>
    </div>
  );
};

ShippingPolicyText.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default ShippingPolicyText;
