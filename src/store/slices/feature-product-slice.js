// src/features/section/sectionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

// Async thunk to fetch sections
export const fetchSections = createAsyncThunk(
    'section/fetchSections',
    async (_, { rejectWithValue }) => {
        try {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            const response = await fetch(`${apiUrl}/api/section/get`, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch sections');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const sectionSlice = createSlice({
    name: 'section',
    initialState: {
        sections: [],
        loading: false,
        error: null,
    },
    reducers: {
        // You can add non-async reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSections.fulfilled, (state, action) => {
                state.sections = action.payload;
                state.loading = false;
            })
            .addCase(fetchSections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default sectionSlice.reducer;
