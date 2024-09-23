import PropTypes from "prop-types";
import clsx from "clsx"
import Swiper, { SwiperSlide } from "../../components/swiper";
import ReviewSingle from "../../components/review/ReviewSingle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../store/slices/review-slice";

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
  const dispatch = useDispatch();
  const { reviews,  error } = useSelector((state) => state.reviews);
  const [allReviews, setallReviews] = useState([])

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    if (reviews.success) {
      setallReviews(reviews.reviews);
    }
  }, [error, reviews]);


  return (
    <div className={clsx("testimonial", spaceBottomClass, spaceTopClass)}>
      <div className="container">
        <div className="">
          <h2 className="satisfy-heading">Testimonial</h2>
          <h3 className="page-heading mt-3">Customer Review</h3>
          <h6 className="heading-xs lh-sm text-center pb-3 mt-2">They have already used our services.</h6>
          {reviews && (
            <Swiper options={settings}>
              {allReviews?.map((single, key) => (
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
