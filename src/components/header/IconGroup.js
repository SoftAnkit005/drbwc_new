import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { FaHeart, FaRegHeart, FaUser } from "react-icons/fa";
import { IoBagHandle, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { clearToken } from "../../store/slices/auth-slice";
import { GiHamburgerMenu } from "react-icons/gi";
import cogoToast from "cogo-toast";
// import userIcon from "../../assets/img/users/user-default.jpg";



const IconGroup = ({ iconWhiteClass }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.product.products);
  const [allCart, setallCart] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchText(searchQuery)
    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const token = useSelector((state) => state.auth.token);

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent the default Link navigation
    cogoToast.error('Logged out Successfully!', { position: 'top-right', hideAfter: 5 });
    dispatch(clearToken());
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

  const getCategoryNameById = (id) => {
    const category = categories?.categories.find((cat) => cat.id === id);
    return category ? category.name : null;
  };

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <div className="search-input-container">
          <form action="#">
            <div className="position-relative">
              <input className="form-control" type="text" value={searchText} placeholder="Search" onChange={handleSearchChange} />
              <IoClose className={`text-muted position-absolute end-0 top-50 translate-middle fs-5 ${searchText !== "" ? "" : "d-none"}`} onClick={() => setSearchText("")}/>
            </div>
            <ul className={searchText !== "" ? "ul-search" : "d-none"}>
              {filteredProducts?.map(product => (
                <li className="desc-xs btn btn-dark rounded-0 border-top w-100 text-start p-1 px-3 text-decoration-none" key={product.id}>
                  <Link className="text-white" to={`/product/${product.id}`}>
                    <p className="text-white mb-0 ellipsis-one-lines desc-xs lh-base">{product.product_name}</p>
                    <p className="text-muted mb-0 desc-xxs lh-base">{getCategoryNameById(product.category_id)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </form>
        </div>

        {/* {!isMobile ? (
        )} */}
      </div>
      <div className="same-style header-search d-lg-none">
        <button className="search-active header-icon px-0" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content rounded-1">
          <form action="#">
            <div className="position-relative">
              <input className="rounded-1" type="text" value={searchText} placeholder="Search" onChange={handleSearchChange} />
              <IoClose className={`text-muted position-absolute end-0 top-50 translate-middle fs-5 ${searchText !== "" ? "" : "d-none"}`} onClick={() => setSearchText("")}/>
            </div>
            <ul className={searchText !== "" ? "ul-search w-100" : "d-none"}>
              {filteredProducts?.map(product => (
                <li className="desc-xs btn btn-dark rounded-0 border-top w-100 text-start p-2 px-3 text-decoration-none" key={product.id}>
                  <Link className="text-white" to={`/product/${product.id}`}>
                    <p className="text-white mb-0 ellipsis-one-lines desc-xs lh-base">{product.product_name}</p>
                    <p className="text-muted mb-0 desc-xxs lh-base">{getCategoryNameById(product.category_id)}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>

      <div className="same-style account-setting">
        <button className="account-setting-active header-icon" onClick={e => handleClick(e)} >
          {token ? 
            <img className="rounded-circle nav-user-icon border border-2" src={`${process.env.PUBLIC_URL}/assets/img/users/user-default.jpg`} alt="User Icon" height={30} width={30}/>
            : 
            <FaUser className="fs-5" />
          }
        </button>
        <div className="account-dropdown">
          <ul>
            {token ? (
              null
            ) : 
            <>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>Login</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Register
                </Link>
              </li>
            </>
            }

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
          <IoBagHandle />
          <span className="count-style">
            {allCart && allCart.length ? allCart.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={() => triggerMobileMenu()} >
        <GiHamburgerMenu />

        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
