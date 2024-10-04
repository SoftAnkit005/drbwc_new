import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from './slices/product-slice';
import currencyReducer from "./slices/currency-slice";
import compareReducer from "./slices/compare-slice";
import signupReducer from './slices/signup-slice';
import loginReducer from './slices/login-slice';
import authReducer from './slices/auth-slice';
import categoryReducer from './slices/category-slice';
import subCategoryReducer from './slices/sub-category-slice';
import reviewReducer from './slices/review-slice';
import featuredproductReducer from './slices/feature-product-slice';
import bannersReducer from './slices/banner-slice';
import couponsReducer from './slices/coupons-slice';
import taxReducer from './slices/tax-slice';
import cartReducer from './slices/cart-slice';
import pincodeReducer from './slices/pincode-slice';
import orderReducer from './slices/order-slice';
import paymentReducer from './slices/payment-slice';
import wishlistReducer from './slices/wishlist-slice';
import tagsReducer from './slices/tags-slice';
import transactionsReducer from './slices/transaction-slice';
import forgotPasswordReducer from './slices/forgot-password-slice';
import resetForgotPasswordReducer from './slices/reset-password-slice';
import userOrdersReducer from './slices/user-order-slice';
import guestCartReducer from './slices/guest-cart-slice';

const persistConfig = {
    key: "flone",
    version: 1.1,
    storage,
    blacklist: ["product"]
}

export const rootReducer = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    auth: authReducer,
    categories: categoryReducer,
    subcategories: subCategoryReducer,
    reviews: reviewReducer,
    banners:bannersReducer,
    featuredproduct: featuredproductReducer,
    product: productReducer,
    coupons: couponsReducer,
    taxes:taxReducer,
    cart: cartReducer,
    pincode: pincodeReducer,
    orders: orderReducer,
    payments: paymentReducer,
    wishlist: wishlistReducer,
    tags: tagsReducer,
    transactions: transactionsReducer,
    forgotPassword : forgotPasswordReducer,
    resetForgotPassword : resetForgotPasswordReducer,
    userOrders: userOrdersReducer,
    guestCart: guestCartReducer,
    

    currency: currencyReducer,
    compare: compareReducer,
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