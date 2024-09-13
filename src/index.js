import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { fetchProducts } from "./store/slices/product-slice"; // Import fetchProducts thunk
// import products from "./data/products.json";
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import { fetchCategories } from "./store/slices/category-slice";
import { fetchSubcategories } from "./store/slices/sub-category-slice";
import { fetchOffers } from "./store/slices/coupons-slice";

// Fetch products from API when the app loads
store.dispatch(fetchProducts());
store.dispatch(fetchCategories());
store.dispatch(fetchSubcategories());
store.dispatch(fetchOffers());

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
      <PersistProvider>
        <App />
      </PersistProvider>
    </Provider>
);
