import { EffectFade } from 'swiper';
import Swiper, { SwiperSlide } from "../../components/swiper";
// import heroSliderData from "../../data/hero-sliders/hero-slider-one.json";
import HeroSliderOneSingle from "../../components/hero-slider/HeroSliderOneSingle.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBanners } from '../../store/slices/banner-slice.js';

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: false // Remove navigation
};



const HeroSliderOne = () => {

  const dispatch = useDispatch();
  const { banners, error } = useSelector((state) => state.banners);
  const [allBanners, setAllBanners] = useState([]);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (banners?.success) {
      const sortedActiveBanners = banners.banners.filter(banner => banner.status === 'active')
      setAllBanners(sortedActiveBanners);
    }
  }, [banners?.success, banners?.banners, error]);

  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {allBanners && (
          <Swiper options={params}>
            {allBanners.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderOneSingle
                  data={single}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderOne;
