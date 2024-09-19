import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],  // Initialize cartItems as an array
    status: 'idle',
    error: null,
  },
  reducers: {},
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
        const existingItemIndex = state.items.findIndex(
          (item) => item.product_id === cartItem.product_id
        );
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = cartItem;
        } else {
          state.items.push(cartItem);
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
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
