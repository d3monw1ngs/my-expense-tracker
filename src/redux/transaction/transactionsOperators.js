import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { 
    setTransactions,
    setStatus,
    setError,
} from './transactionsSlice';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Fetch transactions by type
export const fetchTransactionsByType = createAsyncThunk(
    'transactions/fetchTransactionsByType',
    async ({ type }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setStatus('loading'));
            const response = await axios.get(`transactions/${type}`);
            thunkAPI.dispatch(setTransactions(response.data));
            thunkAPI.dispatch(setStatus('succeeded'));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
            thunkAPI.dispatch(setStatus('failed'));
        }
    }
);

// Create a new transaction
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData, thunkAPI) => {
        try {
            const response = await axios.post('transactions', transactionData);
            thunkAPI.dispatch(addTransaction(response.data));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
        }
    }
);

// Delete a transaction by ID
export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async ({ type, id }, thunkAPI) => {
        try {
            await axios.delete(`transactions/${type}`, { data: { id } });
            thunkAPI.dispatch(deleteTransaction({ id }));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
        }
    }
);

// Update a transaction by ID
export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async ({ type, id, updateData}, thunkAPI) => {
        try {
            const response = await axios.patch(`transactions/${type}/${id}`, updateData);
            thunkAPI.dispatch(updateTransaction(response.data));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
        }
    }
);