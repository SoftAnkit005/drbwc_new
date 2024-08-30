import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShippingPolicyText from "../../wrappers/shipping-policy/ShippingPolicyText";

const ShippingPolicies = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Terms & Condition"
        description="Terms & Condition page of DrBWC"
      /> 
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Terms & Condition", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* text grid */}
        <ShippingPolicyText spaceTopClass="pt-90" spaceBottomClass="pb-90"/>

      </LayoutOne>
    </Fragment>
  );
};

export default ShippingPolicies;
