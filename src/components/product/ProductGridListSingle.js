import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCart } from "../../store/slices/cart-slice";
import cogoToast from "cogo-toast";

const ProductGridListSingle = ({ product, cartItem, wishlistItem, compareItem, spaceBottomClass }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const cartStatus = useSelector((state) => state.cart.status);
  
  const token = localStorage.getItem('authToken');

  // Initialize cartState based on sessionStorage
  useEffect(() => {
    if (!token) {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const isProductInCart = cart.some(item => item.product_id === product.id);
      setIsInCart(isProductInCart);
    }
  }, [product.id, token]);

  const handleAddToCart = () => {
    setCartState(true);

    const payload = {
      product_id: product.id,
      quantity: 1,
      color: 'Default',
    };

    if (token) {
      // Use the API if the user is authenticated
      dispatch(addToCart(payload));

      if (cartStatus === 'succeeded') {
        cogoToast.success(
          <div>
            <div><span className='fw-semibold'>{product.product_name}</span> added to <span className='fw-semibold'>cart.</span></div>
          </div>,
          {
            position: 'top-right',
            hideAfter: 5,
          }
        );
      }
    } else {
      // Use sessionStorage if the user is not authenticated
      let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

      const existingItemIndex = cart.findIndex(
        (item) => item.product_id === payload.product_id && item.color === payload.color
      );

      if (existingItemIndex > -1) {
        // Update quantity if the item already exists in the cart
        cart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to the cart
        cart.push(payload);
      }

      sessionStorage.setItem('cart', JSON.stringify(cart));

      cogoToast.success(
        <div>
          <div><span className='fw-semibold'>{product.product_name}</span> added to <span className='fw-semibold'>cart (Session).</span></div>
        </div>,
        {
          position: 'top-right',
          hideAfter: 5,
        }
      );

      // Update local state
      setIsInCart(true);
    }
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap shadow-lg rounded-2", spaceBottomClass)}>
        <div className="product-img rounded-2">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            {product.image_urls && product.image_urls.length > 0 ? (
              <img className="default-img" src={process.env.PUBLIC_URL + JSON.parse(product.image_urls)[0]} alt="" />
            ) : (
              <img className="default-img" src={process.env.PUBLIC_URL + "/assets/img/placeholder.png"} alt="No image available" />
            )}
            {product.image_urls && product.image_urls.length > 1 && (
              <img className="hover-img" src={process.env.PUBLIC_URL + JSON.parse(product.image_urls)[1]} alt="" />
            )}
          </Link>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            <div className="pro-same-action pro-cart">
              {product.qty && product.qty > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className={isInCart ? "active" : ""}
                  disabled={cartState || isInCart}
                  title={isInCart ? "Added to cart" : "Add to cart"}
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartState || isInCart ? "Added" : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"}
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            {/* <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div> */}
          </div>
        </div>
        <div className="product-content text-center mt-2">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.name}
            </Link>
          </h3>
          <h3 className="product-price fw-semibold pb-1">{product.product_name} </h3>
          <h3 className="product-price fw-semibold pb-2"> ₹ {product.price} </h3>
        </div>
      </div>

      {/* Shop list content (omitted for brevity) */}

      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedPrice={discountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  product: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    discount: PropTypes.number,
    image_urls: PropTypes.string,
    name: PropTypes.string,
    rating: PropTypes.number,
    affiliateLink: PropTypes.string,
    variation: PropTypes.array,
    stock: PropTypes.number,
    shortDescription: PropTypes.string,
    new: PropTypes.bool,
  }),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
