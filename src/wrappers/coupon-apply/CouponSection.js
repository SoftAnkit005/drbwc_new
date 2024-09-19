import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CouponSection = ({ products, cartItems, onDiscountApplied }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('');
  const coupons = useSelector((state) => state.coupons.offers);
  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(() => {
    if (coupons.success) {
      setAllCoupons(coupons.offers);
    }
  }, [coupons]);

  const getProductDetails = (product_id) => {
    return products.find(product => product.id === product_id) || {};
  };

  const calculateDiscount = (coupon) => {
    const currentDate = new Date();
    const startDate = new Date(coupon.start_date);
    const endDate = new Date(coupon.end_date);

    if (currentDate < startDate || currentDate > endDate) {
      return { amount: 0, type: coupon.discount_type, value: coupon.discount_value };
    }

    let discountAmount = 0;

    if (coupon.offer_type === 'product') {
      const productIds = JSON.parse(coupon.product_id);
      const applicableCartItems = cartItems.filter(item => productIds.includes(item.product_id));
      
      if (applicableCartItems.length === 0) return { amount: 0, type: coupon.discount_type, value: coupon.discount_value };

      const totalApplicablePrice = applicableCartItems.reduce((acc, item) => {
        const product = getProductDetails(item.product_id);
        return acc + (parseFloat(product.price) || 0) * item.quantity;
      }, 0);

      if (coupon.discount_type === 'percentage') {
        discountAmount = totalApplicablePrice * (parseFloat(coupon.discount_value) / 100);
      } else if (coupon.discount_type === 'fixed') {
        discountAmount = Math.min(parseFloat(coupon.discount_value), totalApplicablePrice);
      }
    } else if (coupon.offer_type === 'code') {
      const totalCartPrice = cartItems.reduce((acc, item) => {
        const product = getProductDetails(item.product_id);
        return acc + (parseFloat(product.price) || 0) * item.quantity;
      }, 0);

      if (coupon.discount_type === 'percentage') {
        discountAmount = totalCartPrice * (parseFloat(coupon.discount_value) / 100);
      } else if (coupon.discount_type === 'fixed') {
        discountAmount = Math.min(parseFloat(coupon.discount_value), totalCartPrice);
      }
    }

    return { amount: discountAmount.toFixed(2), type: coupon.discount_type, value: coupon.discount_value };
  };

  const handleApplyCoupon = () => {
    const coupon = allCoupons.find(c => c.offer_code === couponCode);

    if (coupon) {
      const { amount, type, value } = calculateDiscount(coupon);

      if (amount > 0) {
        setDiscount(amount);
        setDiscountValue(value);
        setDiscountType(type);
        setMessage(`Coupon applied successfully! You saved INR ${amount}`);
        // Pass discount details to the parent component
        onDiscountApplied({ amount, type, value, couponId: coupon.id });
      } else {
        setMessage('Coupon is not valid or does not apply to your cart.');
        setDiscount(0);
        onDiscountApplied({ amount: 0, type: '', value: '', couponId: null }); // Reset discount details
      }
    } else {
      setMessage('Invalid coupon code. Please try again.');
      setDiscount(0);
      onDiscountApplied({ amount: 0, type: '', value: '', couponId: null }); // Reset discount details
    }
  };

  return (
    <div className="grand-totall mb-4">
      <h4 className="cart-bottom-title section-bg-gray-cart">Apply Coupon Code</h4>
      <div className="coupon-input-group">
        <input
          className="form-control form-control-sm mb-2"
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button className="px-5 border-0" onClick={handleApplyCoupon}>
          {discount > 0 ? 'Coupon Applied' : 'Apply'}
        </button>
      </div>
      {message && (
        <div className={`coupon-message desc-xs mt-2 ${discount > 0 ? 'text-success' : 'text-danger'}`}>
          {message}
        </div>
      )}
      {discount > 0 && (
        <div className="discount-info">
          <h5 className={`my-0 desc-xs ${discount > 0 ? 'text-success' : 'text-danger'}`}>
            Discount Applied: {discountType === 'percentage' ? `${discountValue}%` : `INR ${discountValue}`}
          </h5>
        </div>
      )}
    </div>
  );
};

CouponSection.propTypes = {
  products: PropTypes.array.isRequired,
  cartItems: PropTypes.array.isRequired,
  onDiscountApplied: PropTypes.func.isRequired,
};

export default CouponSection;
