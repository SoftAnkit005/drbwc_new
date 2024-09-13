import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ImageMagnifier from "../image-magnifier/ImageMagnifier";


const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  let imageArray = JSON.parse(product?.image_urls)
  
  const slides = imageArray.map((img, i) => ({
    src: process.env.PUBLIC_URL + img,
    key: i,
  }));


  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: false,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      1200: {
        slidesPerView: 4,
        direction: "vertical"
      }
    }
  };

  return (
    <Fragment>
      <div className="row row-5 test">
        <div className={clsx("col-xl-10 order-xl-2")} >
          <div className="product-large-image-wrapper">
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ""
                )}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}
            {imageArray?.length ? (
              <Swiper options={gallerySwiperParams}>
                {imageArray.map((single, key) => (
                  <SwiperSlide key={key}>
                    {/* <button className="lightgallery-button" onClick={() => setIndex(key)}>
                      <i className="pe-7s-expand1"></i>
                    </button> */}
                    <div className="single-image overflow-visible">
                      {/* <img src={process.env.PUBLIC_URL + single} className="img-fluid" alt="" /> */}
                      <ImageMagnifier imgsrc={process.env.PUBLIC_URL + single}/>
                    </div>
                  </SwiperSlide>
                ))}
                <AnotherLightbox
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    slides={slides}
                    plugins={[Thumbnails, Zoom, Fullscreen]}
                />
              </Swiper>
            ) : null}
          </div>
        </div>
        <div
          className={clsx(thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2")}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {imageArray?.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {imageArray.map((single, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div className="single-image">
                        <img src={process.env.PUBLIC_URL + single} className="img-fluid" alt={`Product Image ${key}`} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : null}

            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({}),
  thumbPosition: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
