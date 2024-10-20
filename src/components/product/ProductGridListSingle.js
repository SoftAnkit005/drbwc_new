import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { updateWishlist } from "../../store/slices/wishlist-slice";
import { addToCart } from "../../store/slices/cart-slice";
import cogoToast from "cogo-toast";
import { FaHeart } from "react-icons/fa";
import { filterTagsByProductId } from "../../helpers/product";
import { addToGuestCart } from "../../store/slices/guest-cart-slice";

const ProductGridListSingle = ({ product, wishlistItem, spaceBottomClass }) => {
  const token = localStorage.getItem('authToken');
  const dispatch = useDispatch();
  const [isInCart, setIsInCart] = useState(false);
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartStatus = useSelector((state) => state.cart.status);
  const { cartItems } = useSelector((state) => state.cart);
  const guestCartItems = useSelector((state) => state.guestCart.cartItems);
  const { tags } = useSelector((state) => state.tags);
  const [wishlistIcon, setwishlistIcon] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    // Check if the product exists in cartItems
    const productInCart = cartItems.some(
      (cartItem) => cartItem.product_id === product.id
    );
    // console.log('isInCart', isInCart, product.id, productInCart);
    setIsInCart(productInCart);
  }, [cartItems, product.id]);
  

  // Initialize cartState based on sessionStorage
  useEffect(() => {
    if (!token) {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const isProductInCart = cart.some(item => item.product_id === product.id);
      setIsInCart(isProductInCart);
    }
  }, [product.id,guestCartItems.length, token]);

  // Set wishlist icon state based on product presence in wishlistItems
  useEffect(() => {
    setwishlistIcon(wishlistItems?.some(item => item.product_id === product.id) ? 'active' : '');
  }, [wishlistItems, product.id]);

  const handleAddToCart = () => {
    const payload = { product_id: product.id, quantity: 1, color: 'Default', };

    if (token) {
      dispatch(addToCart(payload));
      if (cartStatus === 'succeeded') {
        cogoToast.success(
          <div>
            <div>Product added to <span className='fw-semibold'>cart.</span></div>
          </div>,
          {
            position: 'top-right'
          }
        );
      }
    } else {
      // Add product to session storage
      // let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

      // const existingItemIndex = cart.findIndex(
      //   (item) => item.product_id === payload.product_id && item.color === payload.color
      // );

      // if (existingItemIndex > -1) {
      //   cart[existingItemIndex].quantity += 1;
      // } else {
      //   cart.push(payload);
      // }

      // sessionStorage.setItem('cart', JSON.stringify(cart));

      dispatch(addToGuestCart(payload)); // Dispatch to guest cart slice

      cogoToast.success(
        <div>
          <div>Product added to <span className='fw-semibold'>cart.</span></div>
        </div>,
        {
          position: 'top-right'
        }
      );

      // Update local state
      setIsInCart(true);
    }
  };

  const handleWishList = async (id, prod_name) => {
    if (!token) {
      cogoToast.error("Please log in to manage your wishlist.");
      return;
    }

    try {
      await dispatch(updateWishlist({ product_id: id, user_id: user.id })).unwrap();

      if (wishlistIcon === 'active') {
        cogoToast.error(`Product removed from wishlist.`, { position: 'top-right', });
        setwishlistIcon(''); // Reset icon
      } else {
        cogoToast.success(`Product added to wishlist.`, { position: 'top-right', });
        setwishlistIcon('active'); // Set icon to active
      }
    } catch (error) {
      // Handle any errors from the updateWishlist thunk
      console.log(error);
      cogoToast.error("Failed to update wishlist. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap rounded-2", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            {product.image_urls && product.image_urls.length > 0 ? (
              <img className="default-img" src={apiUrl+ '/' + JSON.parse(product.image_urls)[0]} alt="" />
            ) : (
              <img className="default-img" src={apiUrl + "/assets/img/product/drbwc_images/default-product-image.jpg"} alt="No image available" />
            )}
            {product.image_urls && product.image_urls.length > 1 && (
              <img className="hover-img" src={apiUrl + JSON.parse(product.image_urls)[1]} alt="" />
            )}

            {tags.success && filterTagsByProductId(tags.tags, product.id).length > 0 && (
              <div className="product-img-badges">
                {filterTagsByProductId(tags.tags, product.id).map((tag, i) => (
                  <div className="ribbon" key={i}>
                    <span className="ribbon__content">{tag.tags}</span>
                  </div>
                ))}
              </div>
            )}
          </Link>

          {/* <div className="product-action">
            <div className="pro-same-action pro-cart">
              {product.qty && product.qty > 0 ? (
                <button onClick={handleAddToCart} className={isInCart ? "active" : ""} disabled={isInCart} title={isInCart ? "Added to cart" : "Add to cart"} > {" "} <i className="pe-7s-cart"></i>{" "} {isInCart ? "Added" : "Add to cart"} </button>
              ) : (
                <button disabled className="active"> Out of Stock </button>
              )}
            </div>
            <div className="pro-same-action pro-wishlist">
              <button className={wishlistIcon} disabled={wishlistItem !== undefined} title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"} onClick={() => handleWishList(product.id, product.product_name)} >
                <FaHeart className={`text-${wishlistIcon === 'active' ? 'danger' : ''}`} />
              </button>
            </div>
          </div> */}
        </div>
        <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
          <div className="product-content text-center">
            <h3>{product.name}
            </h3>
            <h3 className="product-price fw-semibold pb-1 ellipsis-one-lines" title={product.product_name} data-bs-toggle="tooltip" > {product.product_name} </h3>

            <h3 className="product-price fw-semibold pb-2"> ₹ {product.price} </h3>
          </div>
        </Link>
        <div className="d-flex">
          {product.qty && product.qty > 0 ? (
            <button onClick={handleAddToCart} className={`w-50 btn btn-primary rounded-0 border-end ${isInCart ? "cursor-disabled btn-secondary" : ""}`} disabled={isInCart} title={isInCart ? "Added to cart" : "Add to cart"} > {" "} <i className="pe-7s-cart"></i>{" "} {isInCart ? "Added to cart" : "Add to cart"} </button>
          ) : (
            <button disabled className="w-50 active"> Out of Stock </button>
          )}
          <button className={`w-50 btn btn-primary rounded-0`} disabled={wishlistItem !== undefined} title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"} onClick={() => handleWishList(product.id, product.product_name)} >
            <FaHeart className={`me-1 text-${wishlistIcon === 'active' ? 'danger' : ''}`} />
            {wishlistIcon === 'active' ? "Wishlisted" : "Add to wishlist"}
          </button>
        </div>
      </div>
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
