import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Async thunk for getting orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken'); // Fetch token here to ensure it's current
      const response = await axios.post(`${apiUrl}/api/orders/getOrders`, {
        user_id: userId,
      }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data; // Assuming the response data contains the orders
    } catch (error) {
      // If the request fails, return a rejected promise with the error message
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Create the slice
const userOrdersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: You can add reducers if needed
    resetOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; // Set the orders data
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Capture error from rejected promise
      });
  },
});

// Export the actions
export const { resetOrders } = userOrdersSlice.actions; // Export reset action

// Export the reducer
export default userOrdersSlice.reducer;
