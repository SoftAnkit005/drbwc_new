import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Get cart items
export const getCart = createAsyncThunk('cart/getCart', 
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`${apiUrl}/api/cart/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch: ${errorText}`);
    }

    const data = await response.json();
    // Check for the structure and return cartItems
    if (data.success && data.cartItems) {
      return data.cartItems;
    } else {
      throw new Error('Invalid response structure');
    }
});


// Add product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product_id, quantity, color }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Retrieve token from auth slice

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const body = JSON.stringify({
      product_id,
      quantity,
      color
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${apiUrl}/api/cart/create`, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const result = await response.json(); // Assuming the API returns JSON

      return result; // Return the result, which will be handled by Redux
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors by rejecting with a value
    }
  }
);


// Remove product from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ product_id }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`${apiUrl}/api/cart/remove/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to remove product from cart: ${errorText}`);
      }

      return { product_id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for removing all items from cart
export const removeAllCart = createAsyncThunk(
  'cart/removeAllCart',
  async (product_ids, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const productIds = product_ids.includes(",")
        ? product_ids.split(",")  // Split into array if there are multiple IDs
        : [product_ids];          // Single product ID as an array

      const deleteRequests = productIds.map(product_id =>
        axios.delete(`${apiUrl}/api/cart/remove/${product_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      );

      await Promise.all(deleteRequests);

      return productIds;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove items from the cart");
    }
  }
);

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],  // Initialize cartItems as an array
    status: 'idle',
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
       // getCart
       .addCase(getCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        const cartItem = action.payload.cartItem;
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.product_id === cartItem.product_id
        );
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex] = cartItem;
        } else {
          state.cartItems.push(cartItem);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = state.cartItems.filter(
          (item) => item.product_id !== action.payload.product_id
        );
      })      
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // removeAllCart
      .addCase(removeAllCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAllCart.fulfilled, (state, action) => {
        state.loading = false;
        
        // Filter out items whose product IDs are in action.payload (list of removed product IDs)
        const productIdsToRemove = action.payload;
        state.cartItems = state.cartItems.filter(item => !productIdsToRemove.includes(String(item.product_id))); // Ensure both are strings
      })
      .addCase(removeAllCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;