import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions, updateTransactionThunk, addTransaction, deleteTransaction } from "./transactionsOperators";

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch transactions';
            })
            .addCase(addTransaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to add transaction';
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.status = 'failed';
                state.items = state.items.filter(transaction => transaction.id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to delete transaction';
            })
            .addCase(updateTransactionThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTransactionThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.items.findIndex(transaction => transaction.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateTransactionThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});