import PropTypes from "prop-types";
import React, {  useState } from "react";
import { getProductCartQuantity } from "../../helpers/product";
import { BiSolidOffer } from "react-icons/bi";
import productFrameData from "../../data/product-frame-icon/product-frame-data.json";


const ProductDescriptionInfo = ({
  product,
  cartItems,
}) => {
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const price = 30500

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <p className='desc-xxs mb-1 text-cyan fw-normal'>Brand: DR BWC</p>
      <p className="desc-sm fw-medium d-flex align-items-center blink bg-theme-red px-4 py-1 text-white w-fit rounded mb-2">Special rate <BiSolidOffer className="heading-sm ms-1"/></p>
      <h2 className="heading-sm fw-normal"><span className='desc-sm fw-semibold'>₹</span> 30500.00 <span className="text-danger desc-xs">20% off</span></h2>
      <p className='desc-xs mb-1 text-muted'>Inclusive of all taxes</p>
      {(price>5000)?
        <p className='desc-xs mb-0'><span className='desc-md fw-semibold'>EMI</span> starts at ₹ {Math.floor(price/9)} per month</p>
      :<></>}

      <div className="d-flex align-items-center">
        <span className="desc-xs font-semibold text-white bg-theme-red px-2 py-1 position-relative rounded-start coupon-badge lh-base text-nowrap">
          Coupon : &nbsp;
        </span>
        <input type="checkbox" className="ms-4 w-auto h-auto" id="coupon_check" />
        <label htmlFor="coupon_check" className="mt-0 pb-0 ms-2 desc-xs">
          Apply 10000 coupon
        </label>
      </div>

      <div className="border rounded-3 mt-3">
        <div className="d-flex align-items-center p-2">
          <span className="desc-xs fw-normal text-dark"><BiSolidOffer className="heading-sm ms-1 text-theme-red"/>Sale with extra</span>
          <span className="desc-xs fw-semibold text-theme-red ms-1"> Offers</span>
        </div>
      </div>

      <hr/>

      <div className="row">
        {productFrameData.map((item) => (
          <div key={item.id} className="col-4 col-md-3 text-center p-md-3 p-1 py-2">
            <img src={item.image} alt="" height={40}/>
            <p className='desc-xs mb-0 text-muted lh-sm mt-2'>{item.title}</p>
          </div>
        ))}       
      </div>

      <hr/>

      <div className="row mt-2 mx-0">
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Use for</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; Dr.BWC</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Use for</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; Dr.BWC</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Use for</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; Dr.BWC</div>
      </div>

      <hr/>

      <h2 className="heading-xs fw-semibold mb-2">About this Item</h2>
      <p className="desc-xs lh-base mb-4">Maintaining wellness is linked with not only eating right or exercising on a regular basis but also with using the right wellness maintaining products. Such products help in shaping good posture and bettering the overall physique. For modern people wanting to maintain wellness and lead a healthy life, Dr. Bhanusalis Wellness Care brings forth smart wellness maintaining, acupressure and orthopaedic products as a manufacturer. Our Electric Foot Massager, Electric Pneumatic Compression Device, Squeezing Jade Stone Massage Reflexology Bed, T95 Tourmaline Series Healing Bio Mat, Luxury 4D Full Body Massage Chair, and other products are comfortable and cost-effective. These products make</p>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({})
};

export default ProductDescriptionInfo;
