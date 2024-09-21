import { Fragment } from "react"; 
import { Link, useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import productData from "../../data/corporate-gifts-products/data.json"
import { useSelector } from "react-redux";

const CorporateGifts = () => {
  let { pathname } = useLocation();
  const { categories } = useSelector((state) => state.categories);

  const formatCategoryName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-'); // Converts to lowercase and replaces spaces with hyphens
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Corporate Gifts"
        description="Corporate Gifts of DrBWC"
      /> 
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb pages={[ {label: "Home", path: process.env.PUBLIC_URL + "/" }, {label: "Corporate Gifts", path: process.env.PUBLIC_URL + pathname } ]} />

        {/* corporate slider */}
        <div className="corporate-slider pt-70 pb-70">
          <div className="container row m-auto">
            <div className="col-md-6 products-info d-flex flex-column justify-content-center">
              <h5 className="heading-xl lh-sm text-capitalize fw-bold text-white">corporate gifts from bhanusali wellness</h5>
              <p className="desc-md text-white py-4"> Build lasting partnerships, increase employee engagement, and reward customer loyalty with unforgettable corporate gifts. </p>
              <div className="d-flex align-items-center">
                <Link to="/contact" type="button" className="btn btn-light w-fit rounded-0 py-2 px-4 me-3">Get in Touch</Link>
                <Link to={`${formatCategoryName(categories?.categories[0].name)}?id=${categories?.categories[0].id}`} type="button" className="btn btn-light w-fit rounded-0 py-2 px-4">View Products</Link>
              </div>
            </div>
            <div className="col-md-6 products-img my-3">
              <img className="corporate-gift-img" src="/assets/img/product/drbwc_images/corporate-gifts.png" alt="Product Image" />
            </div>
          </div>
        </div>

        <div className="corporate-ad-section pt-70 pb-70">
          <div className="container m-auto">
            <h5 className="heading-lg lh-sm text-capitalize fancy-text text-center">Keep your top clients & employees happy isn't easy.</h5>
            <h5 className="page-heading lh-sm text-capitalize text-center fw-bold">Keep your top clients & Employees happy with a corporate massage gifts.</h5>
            <p className="desc-md text-center py-4"> In fact, it’s kind of like herding cats. Demands change, deadlines shift, and projects always seem to be in a constant state of flux. If you want to make sure your clients feel appreciated through the daily ups and downs, and that you stay at the top of their list, we’ve got the perfect solution: the gift of massage Accessories. </p>
          </div>
        </div>

        <div className="corporate-slider pt-70 pb-70">
          <div className="container row m-auto">
            <h5 className="heading-lg lh-sm text-capitalize fancy-text text-white text-center">Bhanusali Wellness massagers</h5>
            <h5 className="page-heading lh-sm text-capitalize text-center text-white fw-bold">Discover the corporate gift catalogue</h5>
            <p className="desc-md text-center text-white py-4">A perfect gift is such which they can use on a daily basis or it can increase their happiness & reduce stress every day.</p>
            <div className="row">
              {productData?.map((product, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                  <div className="shadow-lg rounded-2 mb-4 glass-effect overflow-hidden">
                    <div className="corporate-gifts-img-wrapper bg-white">
                      <img src={product.src} alt={product.name} className="corporate-gifts-img" />
                    </div>
                    <p className="desc-md text-center text-white text-capitalize py-2">{product.name}</p>
                  </div>
                </div> 
              ))}
            </div>
          </div>
        </div>

        <div className="about-corporate">
          <div className="container row m-auto py-3 py-md-0">
            <div className="col-lg-4 products-img d-none d-lg-flex align-items-end">
              <img className="corporate-gift-img pt-3" src="/assets/img/product/drbwc_images/about_img.png" alt="Product Image" />
            </div>
            <div className="col-lg-8 products-info d-flex flex-column justify-content-center py-4">
              <h5 className="heading-xl lh-sm text-capitalize fw-bold">about bhanusali wellness corporate gifts</h5>
              <p className="desc-md py-4"> Our curated assortment of gifts makes it effortless to reward loyalty, show appreciation, recognize talent, or celebrate a new venture. Massager Accessories items for the home and office, there is a perfect gift to meet all your needs. </p>
              <div className="d-flex align-items-center">
                <Link to="/about" type="button" className="btn btn-primary text-white w-fit rounded-0 py-2 px-4 me-3">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="corporate-slider pt-70 pb-70">
          <div className="container row m-auto text-center">
            <h5 className="page-heading lh-sm text-white text-capitalize fw-bold">Why you choose massagers as a cooperate gift?</h5>
            <p className="desc-md text-white">Bhanusali Wellness is a proficient company that provides state-of-the-art massages accessories for its users.</p>
            <div className="row mt-3">
              <div className="col-lg-4 mb-3">
                <h5 className="page-heading text-white text-capitalize d-flex align-items-center fw-semibold glass-effect w-fit p-3 rounded-circle lh-1" style={{aspectRatio: '1/1'}}>01</h5>
                <p className="desc-lg text-white mt-2 lh-base text-start">The massages are the next generation and are made with advanced technology where it can measure the height & Weight of the user and can provide the massage accordingly.</p>
              </div>
              <div className="col-lg-4 mb-3">
                <h5 className="page-heading text-white text-capitalize d-flex align-items-center fw-semibold glass-effect w-fit p-3 rounded-circle lh-1" style={{aspectRatio: '1/1'}}>02</h5>
                <p className="desc-lg text-white mt-2 lh-base text-start">The massages are the next generation and are made with advanced technology where it can measure the height & Weight of the user and can provide the massage accordingly.</p>
              </div>
              <div className="col-lg-4 mb-3">
                <h5 className="page-heading text-white text-capitalize d-flex align-items-center fw-semibold glass-effect w-fit p-3 rounded-circle lh-1" style={{aspectRatio: '1/1'}}>03</h5>
                <p className="desc-lg text-white mt-2 lh-base text-start">The massages are the next generation and are made with advanced technology where it can measure the height & Weight of the user and can provide the massage accordingly.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-corporate">
          <div className="container row m-auto py-3 py-md-0">
            <div className="col-lg-8 products-info d-flex flex-column justify-content-center py-4">
              <h5 className="heading-xl lh-sm text-capitalize fw-bold">Give us a call</h5>
              <p className="desc-md py-4"> If you’re looking to go above and beyond for your next corporate gift, you’ve come to the right place. massage Accessories for your clients & Employees will provide the onsite stress relief and relaxation for the companies you do business with. </p>
              <div className="d-flex align-items-center">
                <Link to="/contact" type="button" className="btn btn-primary text-white w-fit rounded-0 py-2 px-4 me-3">Call Now</Link>
              </div>
            </div>
            <div className="col-lg-4 products-img d-none d-lg-flex align-items-end">
              <img className="corporate-gift-img pt-3" src="/assets/img/product/drbwc_images/call_us.png" alt="Product Image" />
            </div>
          </div>
        </div>

      </LayoutOne>
    </Fragment>
  );
};

export default CorporateGifts;
