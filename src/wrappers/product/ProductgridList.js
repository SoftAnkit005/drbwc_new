import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";

const ProductGridList = ({ products, spaceBottomClass }) => {
  // Access cartItems inside the cartItems object
  const cartItems = useSelector((state) => state.cart.cartItems?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems || []);
  const compareItems = useSelector((state) => state.compare.compareItems || []);

  return (
    <Fragment>
      {products?.map(product => {
        return (
          <div className="col-xl-4 col-sm-6" key={product.id}>
            <ProductGridListSingle
              spaceBottomClass={spaceBottomClass}
              product={product}
              cartItem={cartItems.find(cartItem => cartItem.product_id === product.id)}
              wishlistItem={wishlistItems.find(wishlistItem => wishlistItem.product_id === product.id)}
              compareItem={compareItems.find(compareItem => compareItem.product_id === product.id)}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGridList.propTypes = {
  products: PropTypes.array.isRequired,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridList;
