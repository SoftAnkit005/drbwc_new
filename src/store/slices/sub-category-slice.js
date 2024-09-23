import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Fetch subcategories thunk
export const fetchSubcategories = createAsyncThunk(
  'subcategories/fetchSubcategories',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue('Authentication token is missing');
    }

    try {
      const response = await axios.get(`${apiUrl}/api/subcategories/get-subcategories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("subcate:",response.data );
      return response.data; // Return the subcategories data from the API
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch subcategories';
      return rejectWithValue(errorMessage); // Handle API errors
    }
  }
);

// Subcategory slice
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
        state.error = action.payload || 'An error occurred while fetching subcategories';
      });
  },
});

export default subcategorySlice.reducer;
