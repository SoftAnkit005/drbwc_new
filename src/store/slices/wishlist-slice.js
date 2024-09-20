import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

// Define async thunk for fetching wishlist data
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('User not authenticated');
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${apiUrl}/api/wishlist/get`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch wishlist');
      }

      return { wishlistItems: data.wishlistItems || [] }; // Adjust based on API response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding/removing from wishlist
export const updateWishlist = createAsyncThunk(
  'wishlist/updateWishlist',
  async ({ product_id, user_id }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('User not authenticated');
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    const raw = JSON.stringify({ product_id, user_id });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${apiUrl}/api/wishlist/`, requestOptions);
      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Failed to update wishlist');
      }

      return result; // Expecting the API to return the updated wishlist item or success message
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
    loading: false,
    error: null,
    wishlistUpdateStatus: [], // New state for update status
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.wishlistItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = action.payload.wishlistItems;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWishlist.fulfilled, (state, action) => {
        const { success, message } = action.payload; // Destructure the message directly
      
        // Check if the operation was successful
        if (success) {
          const productData = action.meta.arg; // Get product data from the original action payload
      
          // If the message indicates the product was added
          if (message.includes("added")) {
            // Only add if it doesn't already exist in the wishlist
            const exists = state.wishlistItems.some(item => item.product_id === productData.product_id);
            if (!exists) {
              state.wishlistItems.push(productData);
            }
          } 
          // If the message indicates the product was removed
          else if (message.includes("removed")) {
            state.wishlistItems = state.wishlistItems.filter(
              item => item.product_id !== productData.product_id
            );
          }
        }
      
        state.loading = false;
      })
      
      .addCase(updateWishlist.rejected, (state, action) => {
        state.loading = false;
        state.wishlistUpdateStatus = action.payload;
      });
  },
});

export const { setWishlistItems } = wishlistSlice.actions;

export default wishlistSlice.reducer;
