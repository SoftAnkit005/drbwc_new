import React, { useState } from 'react';
import PropTypes from "prop-types";
import { IoMdLock } from 'react-icons/io';
import { LuMapPin } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cart-slice';
import cogoToast from 'cogo-toast';
import { updateWishlist } from '../../store/slices/wishlist-slice';
import { isTokenValid } from '../../helpers/product';

const ProductBuyBox = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const cartStatus = useSelector((state) => state.cart.status);
  const [showTooltip, setShowTooltip] = useState(false);
  const colorImages = JSON.parse(product.color_image_urls);
  const colorNames = Object.keys(colorImages);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [selectedColor, setSelectedColor] = useState('Default');
  const [selectedQty, setselectedQty] = useState('1');
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const token = localStorage.getItem('authToken');

  const isInWishlist = wishlistItems?.some(item => item.product_id === product.id);

  const handleColorChange = (color) => {
    navigate(`?color=${color}`);
  };

  const renderTooltip = (props) => (
    <Tooltip id="secure-transaction-tooltip" {...props}>
      <p className='text-white mb-2'>Your transaction is secure</p>
      <p className='text-white desc-xxs lh-base mb-2'>We work hard to protect your security and privacy. Our payment security system encrypts your information during transmission. We don’t share your credit card details with third-party sellers, and we don’t sell your information to others.</p>
    </Tooltip>
  );
  
  const handleSTClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleAddToCart = () => {
    const payload = {
      product_id: product.id,
      quantity: selectedQty,
      color: selectedColor,
    };

    if (token && isTokenValid(token)) {
      // Use the API if the user is authenticated
      dispatch(addToCart(payload));
      
      if (cartStatus === 'succeeded') {
        cogoToast.success(
          <div>
            <div><span className='fw-semibold'>{product.product_name}</span> added to <span className='fw-semibold'>cart.</span></div>
          </div>,
          { position: 'top-right'}
        );
      }
    } else {
      // Use sessionStorage if the user is not authenticated
      let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      
      const existingItemIndex = cart.findIndex(
        (item) => item.product_id === payload.product_id && item.color === payload.color
      );

      if (existingItemIndex > -1) {
        // Update quantity if item already exists in the cart
        cart[existingItemIndex].quantity = parseInt(cart[existingItemIndex].quantity) + parseInt(payload.quantity);
      } else {
        // Add new item to the cart
        cart.push(payload);
      }
      
      sessionStorage.setItem('cart', JSON.stringify(cart));

      cogoToast.success(
        <div>
          <div><span className='fw-semibold'>{product.product_name}</span> added to <span className='fw-semibold'>cart.</span></div>
        </div>,
        { position: 'top-right'}
      );
    }
  };

  const handleBuyNow = () => {
    const payload = {
      product_id: product.id,
      quantity: selectedQty,
      color: selectedColor,
    };
    if (token && isTokenValid(token)) {
      // Use the API if the user is authenticated
      dispatch(addToCart(payload));
      navigate('/cart', { state: payload });
    } else {
      // Use sessionStorage if the user is not authenticated
      let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      cart.push(payload);
      sessionStorage.setItem('cart', JSON.stringify(cart));
      navigate(process.env.PUBLIC_URL + "/cart");     
    }
  };

  const handleWishList = async (id) => {
    if (!token) {
      cogoToast.error("Please log in to manage your wishlist.");
      return;
    }

    try {
      await dispatch(updateWishlist({ product_id: id, user_id: user.id })).unwrap();
    } catch (error) {
      cogoToast.error("Failed to update wishlist. Please try again.");
    }
  };


  return (
    <>
        <div className="border rounded p-3 mb-3">
            <h2 className="heading-sm fw-normal mb-0"><span className='desc-sm fw-semibold'>₹ </span>{parseFloat(product.price).toLocaleString()}</h2>
            <p className='desc-xs mb-1'>Delivery: <span className='fw-semibold'>{currentDate.getDate()} - {currentDate.getDate() + 4} {monthNames[currentDate.getMonth()]}</span></p>
            <p className='desc-xs mb-1 text-cyan fw-semibold'><LuMapPin /> Pan India Delivery</p>
            <p className='desc-xs mb-1'>Or Fastest Delivery In <span className='fw-semibold'>72 Hours</span></p>

            <div className={`badge-${product.qty > 0 ? 'success' : 'danger'}`}>
                {product.qty > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
            
            <p className='desc-xs mb-1 text-danger fw-normal'>{product.qty > 4 ? 'Only 4 Left In Stock' : 'Only ' + product.qty + ' Left In Stock'}</p>

            <div className="row mt-2 mx-0">
                <div className="col-4 px-0 desc-xxs mb-1 text-muted">Fulfilled by</div>
                <div className="col-8 desc-xxs mb-1 text-black">&nbsp; Dr.BWC</div>
                <div className="col-4 px-0 desc-xxs mb-1 text-muted">Sold by</div>
                <div className="col-8 desc-xxs mb-1 text-black">&nbsp; Dr.BWC</div>
            </div>

            <div className="d-flex align-items-center mb-2">
                <label htmlFor="quantity" className="desc-xxs mb-1">Quantity:</label>
                <select name="quantity" id="quantity" className="form-select form-select-sm  w-25 ms-2 border-muted shadow-none" onChange={(e) => setselectedQty(e.target.value)}>
                  {console.log('product.qty', product.qty)}
                  {product.qty < 4 ? (
                    // Render options dynamically based on product.qty
                    Array.from({ length: product.qty }, (_, index) => (
                      <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))
                  ) : (
                    // Render default options when product.qty >= 4
                    <>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </>
                  )}
                </select>
            </div>

            <div className="pro-details-size mb-3">
                <span>Colors</span>
                <div className="pro-details-size-content">
                <div className="pro-details-size-content">
                {/* Default option */}
                <label className="pro-details-size-content--single">
                    <input type="radio" value="Default" checked={selectedColor === 'Default'} onChange={() => { setSelectedColor('Default'); handleColorChange('Default'); }} />
                    <span className="size-name">Default</span>
                </label>

                {/* Dynamically generated color options */}
                {colorNames.map((color, key) => (
                    <label className="pro-details-size-content--single" key={key}>
                    <input type="radio" value={color} checked={selectedColor === color} onChange={() => { setSelectedColor(color); handleColorChange(color); }} />
                    <span className="size-name">{color}</span>
                    </label>
                ))}
                </div>
                </div>
            </div>

            <button onClick={handleAddToCart} className={`btn ${product.qty <= 0 ? 'btn-secondary cursor-disabled': 'btn-primary'} border w-100 mb-2 desc-sm py-2`} disabled={product.qty <= 0 || cartStatus === 'loading'} > ADD TO CART </button>
            <button onClick={handleBuyNow} className={`btn btn-secondary ${product.qty <= 0 ? 'cursor-disabled': ''} border w-100 mb-2 desc-sm py-2`} disabled={product.qty <= 0}>BUY NOW</button>
            <Link to={product.flipkart_link} target="_blank" className="btn btn-dark border w-100 mb-2 desc-sm">Buy now @ <img src="/assets/img/product/drbwc_images/flipkart_logo.png" alt={product.product_name} height={28}/></Link>
            <Link to={product.amazon_link} target="_blank" className="btn btn-dark border w-100 mb-2 desc-sm py-2">Buy now @ <img src="/assets/img/product/drbwc_images/amazon_logo.png" alt={product.product_name} height={18}/></Link>
            
            <OverlayTrigger show={showTooltip} placement="bottom" overlay={renderTooltip} >
                <p className="cursor-pointer text-cyan desc-xs d-flex align-items-center" onClick={handleSTClick}> <IoMdLock className="desc-md me-1" />Secure Transaction </p>
            </OverlayTrigger>

            <button className={`btn border w-100 mb-2 desc-sm py-2 ${product.qty <= 0 || isInWishlist ? 'cursor-disabled btn-secondary': 'btn-light'}`} onClick={() => handleWishList(product.id, product.product_name)} disabled={product.qty <= 0 || isInWishlist}> {isInWishlist ? 'Added to wishlist' : 'Add to Wishlist'}</button>
        </div>
        <div className="border rounded p-3">
            <p className='desc-xs mb-1'><span className='fw-semibold'>Save upto 12%</span>with business pricing and GST input tax credit.</p>
            <div className='d-flex align-items-center'>
                <input type="text" className='form-control form-control-sm me-1' style={{height: '35px'}}/>
                <button className="btn btn-light border desc-sm rounded-pill w-fit">Submit</button>
            </div>
        </div>
    </>
  )
}

ProductBuyBox.propTypes = {
    product: PropTypes.shape({}),
};

export default ProductBuyBox