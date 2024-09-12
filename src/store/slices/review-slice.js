import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
// Thunk for fetching reviews using the API
export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (_, { rejectWithValue }) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const response = await fetch(`${apiUrl}/api/review/get`, requestOptions);

            if (!response.ok) {
                throw new Error("Failed to fetch reviews");
            }

            const data = await response.json();
            return data; // Assuming the API returns the review data as JSON
        } catch (error) {
            return rejectWithValue(error.message); // Return error message in case of failure
        }
    }
);

// Create the reviews slice
const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {
        // You can add additional non-async reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.loading = false;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Error message from the thunk
            });
    },
});

// Export the reducer to be used in the store
export default reviewSlice.reducer;
