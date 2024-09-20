import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridSingle from "../../components/product/ProductGridSingle";
import { getProducts } from "../../helpers/product";

const settings = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }
};


const RelatedProductSlider = ({ spaceBottomClass, spaceTopClass , products }) => {
  
  return (
    <div className={clsx("related-product-area", spaceBottomClass, spaceTopClass)}>
      <div className="container">
        {products?.length ? (
          <>
            <SectionTitle titleText="Related Products" positionClass="text-center" spaceClass="mb-50" />
            <Swiper options={settings}>
                {products?.map(product => (
                  <SwiperSlide key={product.id}>
                    <ProductGridSingle product={product} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        ) : null}
      </div>
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default RelatedProductSlider;
