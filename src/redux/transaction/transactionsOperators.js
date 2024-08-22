import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { 
//     setError,
//     setTransactions,
//     setStatus,
//     addTransaction,
//     updateTransaction,
//     deleteTransaction
//  } from './transactionsSlice';

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Fetch transactions by type
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    
    async (__, thunkAPI) => {
        try {
            const response = await axios.get(`transactions`);
            console.log("Fetched transactions:", response.data);
            return response.data;
        } catch (error) {
            console.error("Fetch contacts error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
       
    }
);

// Create a new transaction
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (newTransaction, thunkAPI) => {
        try {
            const response = await axios.post('transactions', newTransaction);
            console.log("Added transaction:", response.data);
            return response.data;
        } catch (error) {
            console.error("Add transaction error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Delete a transaction by ID
export const deleteTransaction = createAsyncThunk(
    'transactions/deleteTransaction',
    async (transactionId, thunkAPI) => {
        try {
            await axios.delete(`transactions/${transactionId}`);
            console.log("Deleted transaction:", transactionId);
            return transactionId;
        } catch (error) {
            console.error("Delete transaction error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update a transaction by ID
export const updateTransactionThunk = createAsyncThunk(
    'transactions/updateTransactionThunk',
    async (updatedTransaction, thunkAPI) => {
        try {
            const { id } = updatedTransaction;
            const response = await axios.patch(`transactions/${id}`, updatedTransaction);
            console.log("Updated transaction:", response.data);
            return response.data;
        } catch (error) {
           console.error("Update transaction error:", error.message);
           return thunkAPI.rejectWithValue(error.message);
        }
    }
);