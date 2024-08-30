import PropTypes from "prop-types";
import clsx from "clsx";

const RefundPolicyText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("terms-and-condition", spaceTopClass, spaceBottomClass)}>
      <div className="container px-5">
          <h3 className="page-heading mb-5 text-uppercase">Refund Policy</h3>

          <p className="desc-sm text-muted"> Any product kept in its original form of packing, tags, bills and condition will be entitled to be exchanged or returned if the customer deems so. (whatever the reason may be) All items must be exchanged or returned within 01 day of receipt of the good. Any refund will be made directly to customer’s bank account within 4 – 5 working days after the cancellation & pick up of the goods of the order. </p>
      </div>
    </div>
  );
};

RefundPolicyText.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default RefundPolicyText;
