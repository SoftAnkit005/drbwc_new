import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/header/Logo";
import NavMenu from "../../components/header/NavMenu";
import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";
import HeaderDiscount from "../../components/header/HeaderDiscount";

const HeaderOne = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <header className={clsx("header-area clearfix", headerBgClass, headerPositionClass)}>
      <HeaderDiscount />
      <div className={clsx( headerPaddingClass, "sticky-bar header-res-padding clearfix", scroll > headerTop && "stick" )} >
        <div className={layout === "container-fluid" ? layout : "px-md-5 px-2"}>
          <div className="row">
            <div className="col-md-6 col-4 pb-2">
              {/* header logo */}
              <Logo imageUrl="/assets/img/logo/logo.svg" logoClass="logo text-lg-end" />
            </div>
            <div className="col-md-6 col-8 d-flex justify-content-end align-items-end pb-2">
              {/* Icon group */}
              <IconGroup />
            </div>
            <div className="col-lg-12 d-none d-lg-block px-0">
              {/* Nav menu */}
              <NavMenu />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string
};

export default HeaderOne;
