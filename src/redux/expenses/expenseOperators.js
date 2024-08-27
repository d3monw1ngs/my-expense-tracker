import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExpenseData } from "../../Services/expenseApi";

export const loadExpenseData = createAsyncThunk(
    'expense/loadExpenseData',
    async () => {
        const data = await fetchExpenseData();
        return data;
    }
);