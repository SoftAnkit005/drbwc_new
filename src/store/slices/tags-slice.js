import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Create the async thunk for fetching tags
export const getTags = createAsyncThunk('tags/getTags', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${apiUrl}/api/tag/get`);
    return response.data; // assuming the data contains the tags
  } catch (error) {
    // Handle errors
    return rejectWithValue(error.response?.data || 'An error occurred');
  }
});

const initialState = {
    tags: [],
    loading: false,
    error: null,
  };
  
  const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
      setTags (state, action) {
        state.tags = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getTags.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getTags.fulfilled, (state, action) => {
          state.loading = false;
          state.tags = action.payload;
        })
        .addCase(getTags.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const { setTags } = tagsSlice.actions;
  export default tagsSlice.reducer;