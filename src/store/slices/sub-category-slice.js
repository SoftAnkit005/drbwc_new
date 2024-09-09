// src/store/subcategorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('authToken');
// Define the async thunk for fetching subcategories
export const fetchSubcategories = createAsyncThunk(
  'subcategories/fetchSubcategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/subcategories/get-subcategories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Return the data from the API
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred'); // Handle errors
    }
  }
);

// src/store/subcategorySlice.js
const subcategorySlice = createSlice({
    name: 'subcategories',
    initialState: {
      subcategories: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubcategories.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSubcategories.fulfilled, (state, action) => {
          state.loading = false;
          state.subcategories = action.payload;
        })
        .addCase(fetchSubcategories.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});
  
export default subcategorySlice.reducer;  