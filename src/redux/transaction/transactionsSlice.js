import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: [],
    status: 'idle',
    error: null,
};

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action)  => {
            state.error = action.payload;
        },
        addTransacton: (state, action) => {
            state.transactions.push(action.payload);
        },
        updateTransaction: (state, action) => {
            const index = state.transactions.findIndex((transaction) => transaction.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
        }
    }
});

export const {
    setTransactions,
    setStatus,
    setError,
    addTransaction,
    updateTransaction,
    deleteTransaction,
} = transactionsSlice.actions;