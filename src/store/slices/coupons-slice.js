// couponSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = { method: "GET", headers: myHeaders, redirect: "follow", };

      const response = await fetch( `${apiUrl}/api/offer/get`, requestOptions );

      if (!response.ok) {
        throw new Error("Failed to fetch offers");
      }

      const result = await response.json();
      return result; // Return the fetched result
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const couponSlice = createSlice({
  name: "offers",
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload; 
        state.loading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default couponSlice.reducer;
