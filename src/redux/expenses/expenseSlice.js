import { createSlice } from "@reduxjs/toolkit";
import { fetchExpenseData } from "../../Services/expenseApi";

export const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        totalIncome: 0,
        totalExpense: 0,
        transactions: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenseData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExpenseData.fulfilled, (state, action) => {
                state.totalIncome = action.payload.totalIncome;
                state.totalExpense = action.payload.totalExpense;
                state.transactions = action.payload.transactions;
                state.loading = false;
            })
            .addCase(fetchExpenseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

