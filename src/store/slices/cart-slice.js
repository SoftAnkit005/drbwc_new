import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get token and API URL
const token = localStorage.getItem("authToken");
const apiUrl = process.env.REACT_APP_API_URL;

// Get cart items
export const getCart = createAsyncThunk('cart/getCart', async () => {
  const response = await fetch(`${apiUrl}/api/cart/get`, {
    headers: { "Authorization": `Bearer ${token}`, },
  });
  const result = await response.json();
  return result;
});


// createAsyncThunk for adding a product to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product_id, quantity, color }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/cart/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
        body: JSON.stringify({ product_id, quantity, color }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// createAsyncThunk for removing a product from the cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", token);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(`${apiUrl}/api/cart/remove/${product_id}`, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to remove product from cart: ${errorText}`);
      }

      const result = await response.json();
      return { product_id };

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Cart slice with extraReducers handling addToCart
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
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
        state.status = 'succeeded';
        state.cartItems.push(action.payload);
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
