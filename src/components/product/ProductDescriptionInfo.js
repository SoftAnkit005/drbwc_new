import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiSolidOffer } from "react-icons/bi";
import productFrameData from "../../data/product-frame-icon/product-frame-data.json";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CouponDescModal from "../modals/CouponDescModal";


const ProductDescriptionInfo = ({ product, }) => {
  const [allOffers, setallOffers] = useState([])
  let { id } = useParams();
  const { offers } = useSelector((state) => state.coupons);

  useEffect(() => {
    if(offers.success){
      setallOffers(offers.offers)
    }
  }, [offers])

  const filteredOffers = allOffers.filter(offer => 
    (offer.offer_type === 'code') || 
    (offer.offer_type === 'product' && JSON.parse(offer.product_id).includes(Number(id)))
  );
  

  return (
    <div className="product-details-content ml-70">
      <h2>{product.product_name}</h2>
      <p className='desc-xxs mb-1 text-cyan fw-normal'>Brand: DR BWC</p>
      <p className="desc-sm fw-medium d-flex align-items-center blink bg-theme-red px-4 py-1 text-white w-fit rounded mb-2">Special rate <BiSolidOffer className="heading-sm ms-1"/></p>
      <h2 className="heading-sm fw-normal"><span className='desc-sm fw-semibold'>₹</span> {parseFloat(product.price).toLocaleString()} <span className="text-danger desc-xs">20% off</span></h2>

      <p className='desc-xs mb-1 text-muted'><del>₹ {(parseFloat(product.price) + (parseFloat(product.price) * 0.20)).toLocaleString()} </del> </p>

      <p className='desc-xs mb-1 text-muted'>Inclusive of all taxes</p>
      {(product.price>5000)?
        <p className='desc-xs mb-0'><span className='desc-md fw-semibold'>EMI</span> starts at ₹ {Math.floor(product.price/9)} per month</p>
      :<></>}

      {(product.price>50000)?
        <div className="d-flex align-items-center">
          <span className="desc-xs font-semibold text-white bg-theme-red px-2 py-1 position-relative rounded-start coupon-badge lh-base text-nowrap">
            Coupon : &nbsp;
          </span>
          <input type="checkbox" className="ms-4 w-auto h-auto" id="coupon_check" />
          <label htmlFor="coupon_check" className="mt-0 pb-0 ms-2 desc-xs">
            Apply 10000 coupon
          </label>
        </div>
      :<></>}

      <div className="border rounded-3 mt-3">
        <div className="d-flex align-items-center p-2">
          <span className="desc-xs fw-normal text-dark"><BiSolidOffer className="heading-sm ms-1 text-theme-red"/> Save Extra with </span>
          <span className="desc-xs fw-semibold text-theme-red ms-1"> Offers</span>
        </div>
        {filteredOffers.map((item, index) => (
          <div key={index} className="d-flex align-items-top p-2 border-top">
            <span className="desc-xs fw-semibold text-theme-red ms-1 text-nowrap">
              {item.offer_name} ({item.offer_code}):
            </span>
            <div className="ellipsis-container-wrapper">
              <div className="ellipsis-two-lines ps-2">
                <span className="desc-xs fw-normal text-dark">
                  {item.offer_description}
                </span>
                <CouponDescModal offer={item.offer_name} code={item.offer_code} description={item.offer_description}/>
              </div>
            </div>
          </div>
        ))}
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
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; {product.use_for}</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Power Source</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; {product.power_source}</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Material</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; {product.material}</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Item Weight</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; {product.item_weight}</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Size</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; {product.size}</div>
          <div className="col-3 px-0 desc-xx fw-semibold mb-1">Brand</div>
          <div className="col-8 desc-xs mb-1 text-muted">&nbsp; DR BWC</div>
      </div>

      <hr/>

      <h2 className="heading-xs fw-semibold mb-2">About this Item</h2>
      <p className="desc-xs lh-base mb-4">{product.about_item}</p>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  product: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
