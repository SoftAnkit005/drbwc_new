import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const user = JSON.parse(localStorage.getItem('loggedUser'));

// Async thunk for getting orders
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId, { rejectWithValue, getState }) => { // Fetch token from state
    try {
      const token = getState().auth.token; // Consistently use getState() for token
      const response = await axios.post(`${apiUrl}/api/orders/getOrders`, {
        user_id: userId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data; // Assuming the response data contains the orders
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the update order status API call using createAsyncThunk
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status, comments }, { rejectWithValue, getState, dispatch }) => {
    const token = getState().auth.token;

    try {
      const response = await axios.post(
        `${apiUrl}/api/orders/update/${orderId}`,
        { status, comments },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Optionally refresh the user orders after the update
      await dispatch(fetchUserOrders(user?.id)); // Fetch orders after update

      return response.data; // Return updated order data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const userOrdersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [], // Array of orders
    loading: false,
    error: null,
    updateSuccessMessage: null, // Add a success message field for updates
  },
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user orders cases
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders || []; // Handle potential undefined payload
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update order status cases
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccessMessage = null; // Reset success message
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccessMessage = 'Order updated successfully';

        // Optionally update the orders array with the updated order data
        const updatedOrder = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === updatedOrder.id);
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder; // Update the specific order
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update the order';
      });
  },
});

// Export the actions
export const { resetOrders } = userOrdersSlice.actions;

// Export the reducer
export default userOrdersSlice.reducer;
