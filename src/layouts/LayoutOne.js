import PropTypes from "prop-types";
import { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterOne from "../wrappers/footer/FooterOne";
import ScrollToTop from "../components/scroll-to-top"
import { Link } from "react-router-dom";

const LayoutOne = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass
}) => {
  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      {children}
      <FooterOne
        spaceTopClass="pt-70"
        spaceBottomClass="pb-70"
      />
      <ScrollToTop/>
      <Link to="https://api.whatsapp.com/send/?phone=%2B919825735973&text&app_absent=0" target="_blank" aria-label="Scroll to top" type="button" className="scroll-top whatsapp text-decoration-none" >
          <i className="fa fa-whatsapp"></i>
      </Link>
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.node,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string
};

export default LayoutOne;
