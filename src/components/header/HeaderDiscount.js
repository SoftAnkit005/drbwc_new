import React from 'react'
import { BiSolidOffer } from 'react-icons/bi'

const HeaderDiscount = () => {
  return (
    <div className="text-center offer-top discount-coupon">
        <div className="w-100 header-discount-content">
            <marquee direction="left" loop="">
            <ul className="mb-0 d-flex align-items-center">
                <li>
                  <div className='d-flex align-items-center'>
                    <BiSolidOffer className='fs-5 me-1 blink text-warning'/>
                    <span className="offer">Experience ultimate relaxation with DR BWC: Pioneering wellness across India with cutting-edge massage chairs and holistic wellness solutions!</span>
                  </div>
                </li>
                {/* <li className="ps-3 pe-3 text-white">|</li> */}
                {/* <li>
                  <div className='d-flex align-items-center'>
                    <BiSolidOffer className='fs-5 me-1 blink text-warning'/>
                    <span className="offer">Deal of the day coupon: Flat 50</span>
                  </div>
                </li> */}
            </ul>
            </marquee>
        </div>
    </div>
  )
}

export default HeaderDiscount