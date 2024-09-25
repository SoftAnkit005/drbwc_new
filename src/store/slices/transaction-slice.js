// src/features/transactionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; // Use this for production


// Define initial state
const initialState = {
    transactions: [],
    loading: false,
    error: null,
};

// Create async thunk for creating a transaction
export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (transactionData, { rejectWithValue, getState }) => {
        const token = getState().auth.token;
        try {
            const response = await axios.post(`${apiUrl}/api/transactions/create`, transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data; // Return the response data
        } catch (error) {
            return rejectWithValue(error.response.data); // Handle error
        }
    }
);

// Create the slice
const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload); // Add new transaction to state
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set error in state
            });
    },
});

// Export the async thunk and the reducer
export const { reducer: transactionsReducer } = transactionsSlice;
export default transactionsReducer;
