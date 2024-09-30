import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Define the async thunk for the forgot password API call
export const resetForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, token, password }, thunkAPI) => {
    try {
      // Make an API call using axios
      const response = await axios.post(`${apiUrl}/api/auth/forgot-password`, {
        email,
        token,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Return the response data
      return response.data;
    } catch (error) {
      // Handle the error and return a rejected action
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network error');
    }
  }
);

// Create a slice to handle forgot password state
const resetForgotPasswordSlice = createSlice({
  name: 'resetForgotPassword',
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    // Action to reset the state (optional)
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetForgotPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(resetForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(resetForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to reset password.';
      });
  }
});

// Export the reset action (if needed in the component)
export const { resetForgotPasswordState } = resetForgotPasswordSlice.actions;

// Export the reducer to be used in the store
export default resetForgotPasswordSlice.reducer;
