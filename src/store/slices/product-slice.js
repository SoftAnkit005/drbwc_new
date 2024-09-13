import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // The action type
  async (_, { rejectWithValue }) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch("http://localhost:5000/api/product/get", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload; // Update products manually
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Set products when the async action is successful
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error if the async action fails
      });
  }
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
