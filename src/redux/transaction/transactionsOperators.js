import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { 
    setError,
    setTransactions,
    setStatus,
    addTransaction,
    updateTransaction,
    deleteTransaction
 } from './transactionsSlice';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Fetch transactions by type
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    
    async ({type}, thunkAPI) => {
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
export const addTransactionThunk = createAsyncThunk(
    'transactions/addTransactionThunk',
    async (newTransaction, thunkAPI) => {
        try {
            thunkAPI.dispatch(setStatus('loading'));
            const response = await axios.post('transactions', newTransaction);
            thunkAPI.dispatch(addTransaction(response.data));
            thunkAPI.dispatch(setStatus('succeeded'));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
            thunkAPI.dispatch(setStatus('failed'));
        }
    }
);

// Delete a transaction by ID
export const deleteTransactionThunk = createAsyncThunk(
    'transactions/deleteTransactionThunk',
    async (transactionId, thunkAPI) => {
        try {
            thunkAPI.dispatch(setStatus('loading'));
            await axios.delete(`transactions/${transactionId}`);
            thunkAPI.dispatch(deleteTransaction(transactionId));
            thunkAPI.dispatch(setStatus('succeeded'));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
            thunkAPI.dispatch(setStatus('failed'));
        }
    }
);

// Update a transaction by ID
export const updateTransactionThunk = createAsyncThunk(
    'transactions/updateTransactionThunk',
    async (updatedTransaction, thunkAPI) => {
        try {
            thunkAPI.dispatch(setStatus('loading'));
            const { id } = updatedTransaction;
            const response = await axios.patch(`transactions/${id}`, updatedTransaction);
            thunkAPI.dispatch(updateTransaction(response.data));
            thunkAPI.dispatch(setStatus('succeeded'));
        } catch (error) {
            thunkAPI.dispatch(setError(error.response.data));
            thunkAPI.dispatch(setStatus('failed'));
        }
    }
);