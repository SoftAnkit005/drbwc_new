import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductBuyBox from "../../components/product/ProductBuyBox";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, product }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const wishlistItem = wishlistItems.find(item => item.id === product.id);
  const compareItem = compareItems.find(item => item.id === product.id);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="px-3 px-md-5">
        <div className="row px-xxl-5">
          <div className="col-lg-4 col-xxl-5">
            {/* product image gallery */}
            <ProductImageGallerySideThumb product={product} />
          </div>
          <div className="col-lg-5">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
            />
          </div>
          <div className="col-lg-3 col-xxl-2">
            <ProductBuyBox />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
