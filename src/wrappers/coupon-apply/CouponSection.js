import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CouponSection = ({ products, cartItems, onDiscountApplied }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [totalProductCount, settotalProductCount] = useState();
  const coupons = useSelector((state) => state.coupons.offers);
  const [allCoupons, setAllCoupons] = useState([]);

  useEffect(() => {
    if (coupons.success) {
      setAllCoupons(coupons.offers);
    }

    // Calculate total product count based on cart item quantities
    const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    settotalProductCount(totalCount); // Update total product count
  }, [coupons, cartItems]); // Add cartItems as a dependency


  const getProductDetails = (product_id) => {
    return products.find(product => product.id === product_id) || {};
  };

  const calculateDiscount = (coupon) => {
    const currentDate = new Date();
    const startDate = new Date(coupon.start_date);
    const endDate = new Date(coupon.end_date);

    // Validate coupon dates
    if (currentDate < startDate || currentDate > endDate) {
      return { amount: 0, type: coupon.discount_type, value: coupon.discount_value };
    }

    let discountAmount = 0;
    let discountpercentage = 0;

    // Function to calculate discount based on quantity logic
    const getDiscountBasedOnQty = (itemQuantity, qtyList, discountValues) => {
      for (let i = 0; i < qtyList.length; i++) {
        // Check if quantity is in range
        if (itemQuantity >= qtyList[i] && (i === qtyList.length - 1 || itemQuantity < qtyList[i + 1])) {
          return parseFloat(discountValues[i]); // Return the matching discount value
        }
      }
      // Check if the quantity is above the last qtyList value
      if (itemQuantity > qtyList[qtyList.length - 1]) {
        return parseFloat(discountValues[qtyList.length - 1]); // Apply last discount value for quantity above the highest range
      }
      return null; // No matching quantity found
    };
    

    if (coupon.offer_type === 'product') {
      // Handle product-based discount logic (without qty consideration)
      const productIds = JSON.parse(coupon.product_id || '[]');
      const applicableCartItems = cartItems.filter(item => productIds.includes(item.product_id));

      if (applicableCartItems.length === 0) return { amount: 0, type: coupon.discount_type, value: coupon.discount_value };

      applicableCartItems.forEach(item => {
        const product = getProductDetails(item.product_id);
        const productPrice = parseFloat(product.price) || 0;
        const itemDiscountValue = parseFloat(coupon.discount_value);

        // Calculate discount for product-based offers
        if (coupon.discount_type === 'percentage') {
          discountAmount += productPrice * (itemDiscountValue / 100) * item.quantity;
        } else if (coupon.discount_type === 'fixed') {
          discountAmount += Math.min(itemDiscountValue, productPrice * item.quantity);
        }
      });

    } else if (coupon.offer_type === 'code') {
      // Handle coupon of type "code" with quantity-based discount logic
      const totalCartPrice = cartItems.reduce((acc, item) => {
        const product = getProductDetails(item.product_id);
        const productPrice = parseFloat(product.price) || 0;
        let itemDiscountValue = parseFloat(coupon.discount_value);

        // Apply discount based on quantity logic (only for offer_type "code")
        if (coupon.qty && coupon.qty.length > 0) {
          try {
            const qtyList = JSON.parse(coupon.qty);
            const discountValues = JSON.parse(coupon.discount_value);
            let matchingDiscount = getDiscountBasedOnQty(totalProductCount, qtyList, discountValues);

            if (matchingDiscount !== null) {
              discountAmount += productPrice * (matchingDiscount / 100) * item.quantity;; // Override discount value based on quantity
              discountpercentage = matchingDiscount;
              setDiscountType(matchingDiscount);
            }
          } catch (error) {
            console.error('Error parsing qty or discount_value:', error);
          }
        }

        // Calculate discount based on total cart price and quantity
        if (coupon.discount_type === 'percentage' && coupon.qty === null) {
          discountAmount += productPrice * (itemDiscountValue / 100) * item.quantity;
        } else if (coupon.discount_type === 'fixed' && coupon.qty === null) {
          discountAmount += Math.min(itemDiscountValue, productPrice * item.quantity);
        }

        return acc + productPrice * item.quantity;
      }, 0);
    }

    return { amount: discountAmount.toFixed(2), type: coupon.discount_type, value: coupon.qty && coupon.qty.length > 0 ? discountpercentage : coupon.discount_value };
  };

  const handleApplyCoupon = () => {
    const coupon = allCoupons.find(c => c.offer_code === couponCode);

    if (coupon) {
      const { amount, type, value } = calculateDiscount(coupon);

      // console.log('amount', amount);
      // console.log('type', type);
      // console.log('value', value);

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
        <input className="form-control form-control-sm mb-2" type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
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
