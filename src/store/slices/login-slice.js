import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = process.env.REACT_APP_API_URL;

// Async thunk for logging in
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        // throw new Error('Failed to sign up');
        return error;
      }

      const data = await response.json();
      return data; // Return the response data if sign-up is successful
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message
    }
  }
);

// Initial state for auth slice
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
