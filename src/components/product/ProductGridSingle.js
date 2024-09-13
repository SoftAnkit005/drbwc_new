import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
// import { addToCompare } from "../../store/slices/compare-slice";

const ProductGridSingle = ({ product, cartItem, wishlistItem, compareItem, spaceBottomClass, }) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("product-wrap shadow rounded-2 m-3", spaceBottomClass)}>
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
              {product.affiliateLink ? (
                <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank" >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
                  Select Option
                </Link>
              ) : product.qty && product.qty > 0 ? (
                <button onClick={() => dispatch(addToCart(product))} className={ cartItem !== undefined && cartItem.quantity > 0 ? "active" : "" } disabled={cartItem !== undefined && cartItem.quantity > 0} title={ cartItem !== undefined ? "Added to cart" : "Add to cart" } >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-wishlist">
              <button className={wishlistItem !== undefined ? "active" : ""} disabled={wishlistItem !== undefined} title={ wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist" } onClick={() => dispatch(addToWishlist(product))} >
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

ProductGridSingle.propTypes = {
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

export default ProductGridSingle;
