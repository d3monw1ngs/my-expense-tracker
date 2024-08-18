import { createSlice } from "@reduxjs/toolkit";

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setTransactions(state, action) {
            state.transactions = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        addTransaction(state, action) {
            state.transactions.push(action.payload);
        },
        updateTransaction(state, action) {
            const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteTransaction(state, action) {
            state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTransaction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setTransactions, setStatus, setError, addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;


