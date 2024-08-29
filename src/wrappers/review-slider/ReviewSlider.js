import PropTypes from "prop-types";
import clsx from "clsx"
import Swiper, { SwiperSlide } from "../../components/swiper";
import reviewsData from "../../data/reviews/reviews.json";
import ReviewSingle from "../../components/review/ReviewSingle";

const settings = {
  loop: true,
  autoplay: true,
  grabCursor: true,
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

const ReviewSlider = ({ spaceBottomClass, spaceTopClass }) => {
  return (
    <div className={clsx("testimonial", spaceBottomClass, spaceTopClass)}>
      <div className="container">
        <div className="">
        <h2 className="satisfy-heading">Testimonial</h2>
        <h3 className="page-heading">Customer Review</h3>
        <h6 className="heading-xs lh-sm text-center pb-3">They have already used our services.</h6>
          {reviewsData && (
            <Swiper options={settings}>
              {reviewsData.map((single, key) => (
                <SwiperSlide key={key}>
                  <ReviewSingle
                    data={single}
                    spaceBottomClass="mb-30"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

ReviewSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default ReviewSlider;
