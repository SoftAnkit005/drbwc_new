import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./pages/other/Gallery";
import TermsAndCondition from "./pages/other/TermsAndCondition";
import ShippingPolicies from "./pages/other/ShippingPolicies";
import PrivacyPolicies from "./pages/other/PrivacyPolicies";
import RefundPolicies from "./pages/other/RefundPolicies";
import MasterV4ThermalBed from "./pages/other/MasterV4ThermalBed";
import { useInitialDispatches } from './hooks/useInitialDispatches';
import PaymentPage from "./pages/other/PaymentPage";
import OrderConfirmation from "./pages/other/OrderConfirmation";
import CorporateGifts from "./pages/other/CorporateGifts";

// home page
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));

// shop page
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
  useInitialDispatches();

  return (
      <Router>
        <ScrollToTop>
          <Suspense fallback={ <div className="flone-preloader-wrapper"> <div className="flone-preloader"> <span></span> <span></span> </div> </div> } >
            <Routes>
              {/* Home page */}
              <Route path={process.env.PUBLIC_URL + "/"} element={<HomeFashion/>} />
              {/* Shop page */}
              <Route path={process.env.PUBLIC_URL + "/:category"} element={<ShopGridStandard/>} />
              <Route path={process.env.PUBLIC_URL + "/:category/:id"} element={<ShopGridStandard/>} />
              <Route path={process.env.PUBLIC_URL + "/:category/:id/:subcat"} element={<ShopGridStandard/>} />

              {/* Shop product pages */}
              <Route path={process.env.PUBLIC_URL + "/product/:id"} element={<Product />} />
              <Route path={`${process.env.PUBLIC_URL}/product/:id/:color?`} element={<Product />} />
              
              <Route path={process.env.PUBLIC_URL + "/product-tab-left/:id"} element={<ProductTabLeft/>} />
              <Route path={process.env.PUBLIC_URL + "/product-tab-right/:id"} element={<ProductTabRight/>} />
              <Route path={process.env.PUBLIC_URL + "/product-sticky/:id"} element={<ProductSticky/>} />
              <Route path={process.env.PUBLIC_URL + "/product-slider/:id"} element={<ProductSlider/>} />
              <Route path={process.env.PUBLIC_URL + "/product-fixed-image/:id"} element={<ProductFixedImage/>} /> 

              {/* Other pages */}
              <Route path={process.env.PUBLIC_URL + "/corporate-gifts"} element={<CorporateGifts/>} />
              <Route path={process.env.PUBLIC_URL + "/about"} element={<About/>} />
              <Route path={process.env.PUBLIC_URL + "/gallery"} element={<Gallery/>} />
              <Route path={process.env.PUBLIC_URL + "/contact"} element={<Contact/>} />
              <Route path={process.env.PUBLIC_URL + "/terms-condition"} element={<TermsAndCondition/>} />
              <Route path={process.env.PUBLIC_URL + "/shipping-policy"} element={<ShippingPolicies/>} />
              <Route path={process.env.PUBLIC_URL + "/privacy-policy"} element={<PrivacyPolicies/>} />
              <Route path={process.env.PUBLIC_URL + "/refund-policy"} element={<RefundPolicies/>} />
              <Route path={process.env.PUBLIC_URL + "/automatic-thermal-massage-bed"} element={<MasterV4ThermalBed/>} />
              <Route path={process.env.PUBLIC_URL + "/my-account"} element={<MyAccount/>} />
              <Route path={process.env.PUBLIC_URL + "/login-register"} element={<LoginRegister/>} />

              <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart/>} />
              <Route path={process.env.PUBLIC_URL + "/wishlist"} element={<Wishlist/>} />
              <Route path={process.env.PUBLIC_URL + "/checkout"} element={<Checkout/>} /> 
              <Route path={process.env.PUBLIC_URL + "/payment"} element={<PaymentPage/>} /> 
              <Route path={process.env.PUBLIC_URL + "/order-confirmation"} element={<OrderConfirmation />} />

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
  );
};

export default App;