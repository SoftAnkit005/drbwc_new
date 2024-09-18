// auth-slice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('authToken') || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('authToken');
    }
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
