import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  'signup/signUpUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        // throw new Error('Failed to sign up');
        return error;
      }

      const data = await response.json();
      return data; // Return the response data if sign-up is successful
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message if sign-up fails
    }
  }
);

// Step 3: Create the Redux slice
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetUser(state) {
      state.user = null; // Reset user to null
      state.error = null; // Optionally reset error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Update the user state with the response payload
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Update the error state with the error message
      });
  },
});

export const { resetUser } = signupSlice.actions; 
export default signupSlice.reducer;
