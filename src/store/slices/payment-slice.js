import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

// Process Cash on Delivery (COD)
  export const processCOD = createAsyncThunk(
    'payment/processCOD',
    async ({ orderId }, { rejectWithValue, getState }) => {
      const token = getState().auth.token;
      try {
        // Setup headers
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        myHeaders.append('Content-Type', 'application/json');

        // Setup request body
        const raw = JSON.stringify({ payment_method: 'cash on delivery', status: 'shipped' });

        // Setup request options
        const requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow', };

        // Send the request
        const response = await fetch(`${apiUrl}/api/orders/update/${orderId}`, requestOptions);
        const data = await response.json();

        // Check if response is not ok
        if (!response.ok) {
          throw new Error(data.message || 'Failed to process COD');
        }

        // Return data if successful
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Process Payment through CCAvenue
  export const processPayment = createAsyncThunk(
    'payment/processPayment',
    async ({ orderId }, { rejectWithValue }) => {
      try {
        const response = await fetch(`/api/orders/${orderId}/ccavenue`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to process payment');
        return data;
      }
      catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.error = action.payload.success ? null : action.payload.error;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(processCOD.pending, (state) => {
        state.loading = true;
      })
      .addCase(processCOD.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.error = action.payload.success ? null : action.payload.error;
      })
      .addCase(processCOD.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
