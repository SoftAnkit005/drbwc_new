import { Fragment, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from 'swiper';
import Swiper, { SwiperSlide } from "../../components/swiper";
import ImageMagnifier from "../image-magnifier/ImageMagnifier";
import { useLocation, useNavigate } from "react-router-dom";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const colorImages = JSON.parse(product.color_image_urls);
  const colorNames = Object.keys(colorImages);
  const colorImagesArray = Object.values(colorImages);
  const [selectedColor, setSelectedColor] = useState('Default');

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
    touchRatio: 1, // Increase touch sensitivity
    loop: false,
    slideToClickedSlide: true,
    direction: thumbPosition === "left" ? "vertical" : "horizontal",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal",
        spaceBetween: 5, // Reduce space on smaller screens
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal",
      },
      992: {
        slidesPerView: 4,
        direction: thumbPosition === "left" ? "vertical" : "horizontal",
      },
      1200: {
        slidesPerView: 4,
        direction: "vertical",
      },
    },
  };
  

  console.log('product', product);

  const handleColorChange = (color) => {
    navigate(`?color=${color}`);
  };

  return (
    <Fragment>
      <p className="mb-3 d-lg-none fw-semibold heading-sm">{product.product_name}</p>
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
                {/* <AnotherLightbox
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    slides={slides}
                    plugins={[Thumbnails, Zoom, Fullscreen]}
                /> */}
              </Swiper>
            ) : null}
          </div>
        </div>
        <div className={clsx(thumbPosition && thumbPosition === "left" ? "col-xl-2 order-2 order-xl-1" : "col-xl-2")} >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {imageArray?.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {imageArray.map((single, key) => (
                  <SwiperSlide key={key}>
                    <div className="single-image">
                      <img src={`${apiUrl}/${single}`} className="img-fluid" alt={`Product Image ${key}`} height={80} width={80}/>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}

          </div>
        </div>
      </div>

      <div className="pro-details-size image-gallery-pro-details my-3 d-lg-none">
          <div className="pro-details-size-content">
            <div className="pro-details-size-content">
              {/* Default option */}
              <label className="pro-details-size-content--single rounded overflow-hidden">
                  <div className="d-flex align-items-center justify-content-center p-1">
                    {defaultImageUrls?.length ? (
                      <img className="rounded" height={70} width={70} src={apiUrl + '/' + defaultImageUrls[0]} alt="" />
                    ) : null}
                  </div>
                  <input type="radio" value="Default" checked={selectedColor === 'Default'} onChange={() => { setSelectedColor('Default'); handleColorChange('Default'); }} />
                  <span className="size-name fw-semibold">Default</span>
              </label>

              {/* Dynamically generated color options */}
              {colorNames.map((color, key) => (
                  <label className="pro-details-size-content--single rounded overflow-hidden" key={key}>
                    <div className="d-flex align-items-center justify-content-center p-1">
                      <img className="rounded" height={70} width={70} src={apiUrl + '/' + colorImagesArray[key]} alt="" />
                    </div>
                    <input type="radio" value={color} checked={selectedColor === color} onChange={() => { setSelectedColor(color); handleColorChange(color); }} />
                    <span className="size-name fw-semibold">{color}</span>
                  </label>
              ))}
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
