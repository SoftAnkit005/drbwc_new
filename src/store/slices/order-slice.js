import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;
// Define the create order API call using createAsyncThunk
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(orderData);
      console.log('orderData', orderData);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(`${apiUrl}/api/orders/create`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
