import PropTypes from "prop-types";
import clsx from "clsx"
import Swiper, { SwiperSlide } from "../../components/swiper";
import customerData from "../../data/customers-images/customerImages.json";
import CustomerSingleImage from "../../components/customer-single/CustomerSingleImage";

const settings = {
  freeMode: true,
  loop: true,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  slidesPerView: 3,
  spaceBetween: 32,
  speed: 5000,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    640: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 4
    },
  }
};

const CustomersSlider = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("productvideoslider", spaceBottomClass, spaceTopClass)}>
      <div className="container">
        <h3 className="page-heading mb-5">Happy customers</h3>
        {customerData && (
          <Swiper options={settings}>
            {customerData.map((single, key) => (
              <SwiperSlide key={key}>
                <CustomerSingleImage
                  data={single}
                  spaceBottomClass="mb-30"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

CustomersSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CustomersSlider;
