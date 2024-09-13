import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;


// Define your async thunk
export const getBanners = createAsyncThunk(
    'banners/getBanners',
    async (_, { rejectWithValue }) => {

        try {
            const response = await fetch(`${apiUrl}/api/banners/get-banner`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch banners');
            }

            const data = await response.json();
            return data; // Return the data payload
        } catch (error) {
            return rejectWithValue(error.message); // Return error message
        }
    }
);

// Create a slice
const bannersSlice = createSlice({
    name: 'banners',
    initialState: {
        banners: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banners = action.payload;
            })
            .addCase(getBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default bannersSlice.reducer;
