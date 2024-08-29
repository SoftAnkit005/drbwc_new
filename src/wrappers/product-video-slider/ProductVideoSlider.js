import PropTypes from "prop-types";
import clsx from "clsx"
import Swiper, { SwiperSlide } from "../../components/swiper";
import productsVideoData from "../../data/product-videos/productVideos.json";
import ProductSingleVideo from "../../components/product-video/ProductSingleVideo";

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
      slidesPerView: 3
    },
  }
};

const ProductVideoSlider = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("productvideoslider", spaceBottomClass, spaceTopClass)}>
      <div className="container">
        <h3 className="page-heading mb-5">Product Videos</h3>
        {productsVideoData && (
          <Swiper options={settings}>
            {productsVideoData.map((single, key) => (
              <SwiperSlide key={key}>
                <ProductSingleVideo
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

ProductVideoSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default ProductVideoSlider;
