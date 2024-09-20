import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { FaHeart, FaUser } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { clearToken } from "../../store/slices/auth-slice";

const IconGroup = ({ iconWhiteClass }) => {
  const dispatch = useDispatch();
  const [allCart, setallCart] = useState([]);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
    // window.location.reload();
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };

  useEffect(() => {
    let cartData = [];

    if (token !== null) {
      // Token is available, use cartItems from Redux store
      if (cartItems) {
        cartData = cartItems?.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.product_id === item.product_id)
        );
      }
    } else {
      // Token is not available, use cartItems from sessionStorage
      const storedCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
      cartData = storedCartItems;
    }

    setallCart(cartData);
  }, [cartItems, token]); // Update cart data when cartItems or token changes

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active header-icon" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button className="account-setting-active header-icon" onClick={e => handleClick(e)} >
          <FaUser className="fs-5" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/my-account"}>
                my account
              </Link>
            </li>
            {token ? (
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="same-style header-wishlist">
        <Link className="header-icon" to={process.env.PUBLIC_URL + "/wishlist"}>
          <FaHeart className="fs-5" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart header-icon" onClick={e => handleClick(e)}>
          <IoBagHandle />
          <span className="count-style">
            {allCart && allCart.length ? allCart.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {allCart && allCart.length ? allCart.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
