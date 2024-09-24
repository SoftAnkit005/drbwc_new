import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterSocialMedia from "../../components/footer/sub-components/FooterSocialMedia";
import FooterCopyright from "../../components/footer/FooterCopyright";
import { useSelector } from "react-redux";


const FooterOne = ({ spaceTopClass, spaceBottomClass, spaceLeftClass, spaceRightClass, containerClass, extraFooterClass, sideMenu }) => {
  const { categories } = useSelector((state) => state.categories);

  const formatCategoryName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-'); // Converts to lowercase and replaces spaces with hyphens
  };

  return (
    <>
      <footer className={clsx("footer-area", spaceTopClass, spaceBottomClass, extraFooterClass, spaceLeftClass, spaceRightClass )}>
        <div className={`${containerClass ? containerClass : "container"}`}>
          <div className="row">
            <div className={`${ sideMenu ? "col-xl-3 col-sm-6 my-2" : "col-lg-3 col-sm-12 my-2" }`} >
              <Link to={process.env.PUBLIC_URL + "/"}>
                <img alt="" src={process.env.PUBLIC_URL + "/assets/img/logo/logo.svg"} />
              </Link>
              <p className="text-white pt-3">Wellness Care products are a result of an in-depth and voluminous research on various ancient Oriental Healing Practices.</p>
              <div className="footer-title"> <h3>Follow Us On</h3> </div>
              <FooterSocialMedia/>
            </div>
            <div className={`${ sideMenu ? "col-xl-3 col-sm-6 my-2" : "col-lg-3 col-sm-4 my-2" }`} >
              <div className="footer-widget mb-30 ml-30">
                <div className="footer-title text-uppercase"> <h3>Usefull links</h3> </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/about"}>About us</Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/gallery"}> Gallery </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/contact"}> Contact Us </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/terms-condition"}> Terms & Conditions </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/shipping-policy"}> Shipping Policy </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/privacy-policy"}> Privacy Policy </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/refund-policy"}> Refund Policy </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`${ sideMenu ? "col-xl-3 col-sm-6 my-2" : "col-lg-3 col-sm-4 my-2" }`} >
              <div className={`${ sideMenu ? "footer-widget mb-30 ml-95" : "footer-widget mb-30 ml-50" }`} >
                <div className="footer-title text-uppercase"> <h3>Categories</h3> </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/automatic-thermal-massage-bed"}>Advance Master V4 Thermal Heating Bed</Link>
                    </li>
                    {categories?.categories.map((category) => (
                      <li key={category.id}>
                        <Link to={process.env.PUBLIC_URL + `/category/${formatCategoryName(category.name)}?id=${category.id}`}>{category.name}</Link>
                      </li>
                    ))}
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/corporate-gifts"}>Corporate Gifts</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={`${ sideMenu ? "col-xl-3 col-sm-6 my-2" : "col-lg-3 col-sm-4 my-2" }`} >
              <div className={`${ sideMenu ? "footer-widget mb-30 ml-95" : "footer-widget mb-30 ml-50" }`} >
                <div className="footer-title text-uppercase"> <h3>About Company</h3> </div>
                <div className="footer-list mb-3">
                  <ul>
                    <li> VIP Road,Vesu,Surat Gujrat,395007 India </li>
                  </ul>
                </div>
                <div className="footer-title text-uppercase"> <h3>Email</h3> </div>
                <div className="footer-list mb-3">
                  <ul>
                    <li> <a href="mailto:info@DrBWC.com">info@DrBWC.com</a> </li>
                  </ul>
                </div>
                <div className="footer-title text-uppercase"> <h3>Toll free number</h3> </div>
                <div className="footer-list mb-3">
                  <ul>
                    <li> <a href="callto:18004195973">18004195973</a> </li>
                  </ul>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </footer>
      {/* footer copyright */}
      <FooterCopyright />
    </>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterOne;
