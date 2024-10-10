import { Fragment, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";
import ImageMagnifier from "../image-magnifier/ImageMagnifier";
import { useLocation } from "react-router-dom";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;

  // Get the 'color' query parameter
  const queryParams = new URLSearchParams(location.search);
  const color = queryParams.get("color");

  // Memoize parsing to avoid re-render loops
  const colorImageUrls = useMemo(
    () => (product?.color_image_urls ? JSON.parse(product.color_image_urls) : {}),
    [product?.color_image_urls]
  );
  const defaultImageUrls = useMemo(
    () => (product?.image_urls ? JSON.parse(product.image_urls) : []),
    [product?.image_urls]
  );

  // Set the image array based on the selected color
  const [imageArray, setImageArray] = useState(defaultImageUrls);

  useEffect(() => {
    if (color && colorImageUrls[color]) {
      setImageArray(colorImageUrls[color]);
    } else {
      setImageArray(defaultImageUrls);
    }
  }, [color, colorImageUrls, defaultImageUrls]);

  const slides = imageArray.map((img, i) => ({
    src: process.env.PUBLIC_URL + img,
    key: i,
  }));

  // Swiper slider settings
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
                    <div className="single-image overflow-visible">
                      <ImageMagnifier imgsrc={single} />
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
        <div className={clsx(thumbPosition && thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")} >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {imageArray?.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {imageArray.map((single, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <div className="single-image">
                        <img src={`${apiUrl}/${single}`} className="img-fluid" alt={`Product Image ${key}`} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : null}
          </div>
        </div>
      </div>
      {product.video_link && (
        <section className="video-section my-2 my-lg-5">
          <div className="video-wrapper">
              <iframe
                width="100%"
                height="400"
                src={product.video_link.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
          </div>
        </section>
      )}
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({}),
  thumbPosition: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
