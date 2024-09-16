// src/store/slices/taxSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

// Define the initial state
const initialState = {
  taxdata: null,
  status: 'idle',
  error: null
};

// Define the thunk for the API call
export const fetchTaxData = createAsyncThunk(
  'tax/fetchTaxData',
  async () => {
    const response = await fetch(`${apiUrl}/api/tax/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); // Parse the response as JSON
    return { taxdata: data }; // Return the data in an object
  }
);

// Create the slice
const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTaxData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.taxdata = action.payload.taxdata; // Access the taxdata from the object
      })
      .addCase(fetchTaxData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default taxSlice.reducer;
