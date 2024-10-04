import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(sessionStorage.getItem('cart')) || [],
};

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    addToGuestCart: (state, action) => {
      const { product_id, quantity, color } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.product_id === product_id && item.color === color
      );

      if (existingItemIndex > -1) {
        // If item already exists, update the quantity
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Check for duplicates (only based on product_id) and prevent adding duplicates
        const duplicateIndex = state.cartItems.findIndex(item => item.product_id === product_id);
        
        if (duplicateIndex === -1) {
          // If no duplicate, add the item to cart
          state.cartItems.push(action.payload);
        } else {
          // If duplicate found (same product_id), you might want to handle it here
          // For example, just update the quantity
          state.cartItems[duplicateIndex].quantity += quantity;
        }
      }

      // Update sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromGuestCart: (state, action) => {
      const { product_id } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product_id !== product_id);

      // Update sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    clearGuestCart: (state) => {
      state.cartItems = [];
      sessionStorage.removeItem('cart');
    },
    fetchGuestCart: (state) => {
      // Load cart from sessionStorage
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      state.cartItems = cart;
    }
  }
});

export const { addToGuestCart, removeFromGuestCart, clearGuestCart, fetchGuestCart } = guestCartSlice.actions;

export default guestCartSlice.reducer;
