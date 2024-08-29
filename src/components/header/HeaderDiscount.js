import React from 'react'

const HeaderDiscount = () => {
  return (
    <div className="text-center offer-top discount-coupon">
        <div className="w-100 header-discount-content">
            <marquee direction="right" loop="">
            <ul className="mb-0 d-flex align-items-center">
                <li>
                  <img className='me-2' src="https://drbwc.com/Assets/Images/discount.svg" alt="Discount" />
                  <span className="offer">First order Discount: Flat 2%</span>
                </li>
                <li className="ps-3 pe-3 text-white">|</li>
                <li>
                  <img className='me-2' src="https://drbwc.com/Assets/Images/discount.svg" alt="Discount" />
                  <span className="offer">Deal of the day coupon: Flat 50</span>
                </li>
            </ul>
            </marquee>
        </div>
    </div>
  )
}

export default HeaderDiscount