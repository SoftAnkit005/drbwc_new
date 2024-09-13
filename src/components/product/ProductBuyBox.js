import React, { useState } from 'react'
import PropTypes from "prop-types";
import { IoMdLock } from 'react-icons/io'
import { LuMapPin } from 'react-icons/lu'
import { Link } from 'react-router-dom';

const productSize = ["S", "M", "L", "XL"]


const ProductBuyBox = ({product}) => {
    console.log(product);
    const currentDate = new Date();
    const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    const [selectedProductSize, setSelectedProductSize] = useState(
        productSize.variation ? productSize.variation[0].size[0].name : ""
    );
    const [productStock, setProductStock] = useState(
        productSize.variation ? productSize.variation[0].size[0].stock : productSize.stock
    );
    const [quantityCount, setQuantityCount] = useState(1);

    const colorImages = JSON.parse(product.color_image_urls); // Parsing JSON string to object
    const colorNames = Object.keys(colorImages);

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
            
            <p className='desc-xs mb-1 text-danger fw-normal'>Only 2 Left In Stock.</p>
            <div className="row mt-2 mx-0">
                <div className="col-4 px-0 desc-xxs mb-1 text-muted">Fulfilled by</div>
                <div className="col-8 desc-xxs mb-1 text-black">&nbsp; Dr.BWC</div>
                <div className="col-4 px-0 desc-xxs mb-1 text-muted">Sold by</div>
                <div className="col-8 desc-xxs mb-1 text-black">&nbsp; Dr.BWC</div>
            </div>

            <div className="d-flex align-items-center mb-2">
                <label htmlFor="quantity" className="desc-xxs mb-1">Quantity:</label>
                <select name="quantity" id="quantity" className="form-select form-select-sm  w-25 ms-2 border-muted shadow-none">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <div className="pro-details-size mb-3">
                <span>Colors</span>
                <div className="pro-details-size-content">
                    {/* Static sizes */}
                    {colorNames.map((color, key) => (
                        <label className="pro-details-size-content--single" key={key}>
                        <input
                            type="radio"
                            value={color}
                            checked={color === selectedProductSize ? "checked" : ""}
                            onChange={() => {
                            setSelectedProductSize(color);
                            setProductStock(10); // Replace with actual stock value if needed
                            setQuantityCount(1);
                            }}
                        />
                        <span className="size-name">{color}</span>
                        </label>
                    ))}
                </div>
            </div>


            <button className="btn btn-primary border w-100 mb-2 desc-sm py-2">ADD TO CART</button>
            <button className="btn btn-secondary border w-100 mb-2 desc-sm py-2">BUY NOW</button>
            <Link to={product.flipkart_link} target="_blank" className="btn btn-dark border w-100 mb-2 desc-sm">Buy now @ <img src="/assets/img/product/drbwc_images/flipkart_logo.png" alt={product.product_name} height={28}/></Link>
            <Link to={product.amazon_link} target="_blank" className="btn btn-dark border w-100 mb-2 desc-sm py-2">Buy now @ <img src="/assets/img/product/drbwc_images/amazon_logo.png" alt={product.product_name} height={18}/></Link>
            <p className="text-cyan desc-xs d-flex align-items-center"><IoMdLock className='desc-md me-1'/>Secure Transaction</p>
            <button className="btn btn-light border w-100 mb-2 desc-sm py-2">Add to Wish List</button>
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