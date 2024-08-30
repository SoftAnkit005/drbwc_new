import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import FeaturedProducts from "../../wrappers/feature-icon/FeaturedProducts";
import ReviewSlider from "../../wrappers/review-slider/ReviewSlider";
import WhyDrbwc from "../../wrappers/why-drbwc/WhyDrbwc";
import ProductVideoSlider from "../../wrappers/product-video-slider/ProductVideoSlider";
import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

const HomeFashion = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Auto Wellness Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutOne headerContainerClass="container-fluid" headerPaddingClass="header-padding-1" >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured products */}
        <FeaturedProducts spaceTopClass="" spaceBottomClass="pb-50" />

        {/* Review Slider */}
        <ReviewSlider spaceTopClass="pt-90" spaceBottomClass="pb-90"/>

        {/* Why Dr.BWC Section */}
        <WhyDrbwc spaceTopClass="pt-90" spaceBottomClass="pb-90"/>
        
        {/* Product video Section */}
        <ProductVideoSlider spaceTopClass="pt-90" spaceBottomClass="pb-90"/>
        
        {/* Brand Logo Section */}
        <BrandLogoSliderOne spaceTopClass="pt-90" spaceBottomClass="pb-90"/>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
