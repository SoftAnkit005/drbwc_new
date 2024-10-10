import PropTypes from "prop-types";
import clsx from "clsx";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductBuyBox from "../../components/product/ProductBuyBox";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, product }) => {

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
            />
          </div>
          <div className="col-lg-3 col-xxl-2">
            <ProductBuyBox product={product}/>
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
