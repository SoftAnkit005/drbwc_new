import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from './slices/product-slice';
import currencyReducer from "./slices/currency-slice";
import cartReducer from "./slices/cart-slice";
import compareReducer from "./slices/compare-slice";
import wishlistReducer from "./slices/wishlist-slice";
import signupReducer from './slices/signup-slice';
import loginReducer from './slices/login-slice';
import categoryReducer from './slices/category-slice';
import subCategoryReducer from './slices/sub-category-slice';
import reviewReducer from './slices/review-slice';
import featuredproductReducer from './slices/feature-product-slice';
import bannersReducer from './slices/banner-slice';
import couponsReducer from './slices/coupons-slice';

const persistConfig = {
    key: "flone",
    version: 1.1,
    storage,
    blacklist: ["product"]
}

export const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    reviews: reviewReducer,
    banners:bannersReducer,
    featuredproduct: featuredproductReducer,
    product: productReducer,
    coupons: couponsReducer,

    currency: currencyReducer,
    cart: cartReducer,
    compare: compareReducer,
    wishlist: wishlistReducer,
    featuredproduct: featuredproductReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);