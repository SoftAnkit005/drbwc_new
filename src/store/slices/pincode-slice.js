import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pincodeData: null, // Initialize as null to better handle clearing
  state: '',
  loading: false,
  error: null
};

export const fetchPincodeData = createAsyncThunk(
  'pincode/fetchPincodeData',
  async (pincode, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = response.data;
      if (data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const place = data[0].PostOffice[0];
        return { city: place.Name, state: place.State };
      } else {
        return { city: '', state: '' };
      }
    } catch (error) {
      return rejectWithValue('Error fetching location data');
    }
  }
);

const pincodeSlice = createSlice({
  name: 'pincode',
  initialState,
  reducers: {
    clearPincodeData(state) {
      state.pincodeData = null;
      state.state = '';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPincodeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPincodeData.fulfilled, (state, action) => {
        state.pincodeData = action.payload;
        state.state = action.payload.state;
        state.loading = false;
      })
      .addCase(fetchPincodeData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { clearPincodeData } = pincodeSlice.actions;

export default pincodeSlice.reducer;
