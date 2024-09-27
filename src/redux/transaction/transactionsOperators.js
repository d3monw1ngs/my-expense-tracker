import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestParams, setAuthHeader } from "../../redux/auth/authOperations";
import axios from "axios";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Fetch transactions by type
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async ({ type, date }, thunkAPI) => {
        try {
            const {aToken} = requestParams(thunkAPI);
            if (aToken === null) return thunkAPI.rejectWithValue('no token');
            setAuthHeader(aToken);
            const response = await axios.get(`/transactions/${type}`, {date});
            console.log('Fetched transactions:', response.data)
            return { data: response.data, type };
        } catch (error) {
            console.error("Fetch transactions error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }       
    }
);

// Create a new transaction
export const addTransaction = createAsyncThunk(
    'transactions/addTransaction',
    async (transactionData, thunkAPI) => {
        try {
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            const response = await axios.post('/transactions', transactionData);
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
    async ({type, id}, thunkAPI) => {
        try {
            const {aToken} = requestParams(thunkAPI);
            setAuthHeader(aToken);
            await axios.delete(`/transactions/${id}`, { type });
            console.log("Deleted transaction:", id);
            return {id, type};
        } catch (error) {
            console.error("Delete transaction error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update a transaction by ID
export const updateTransaction = createAsyncThunk(
    'transactions/updateTransaction',
    async (transactionData, thunkAPI) => {
        const {
            id,
            type,
            date,
            time,
            category,
            sum,
            comment,
            editType,
            oldType
        } = transactionData;

        try {
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            let response;

            if (editType === 'content') {
                response = await axios.patch(`/transactions/${type}/${id.old}`, {
                    date,
                    time,
                    category,
                    sum,
                    comment
                });
            } else {
                response = await axios.post('/transactions', {
                    type,
                    date,
                    time,
                    category,
                    sum,
                    comment
                });
                await axios.delete(`/transactions/${id.old}`, { data: { type } });
            }
           
            return {
                ...response.data,
                editType,
                oldId: id.old,
                oldType
            };
        } catch (error) {
           console.error("Update transaction error:", error.message);
           return thunkAPI.rejectWithValue(error.message);
        }
    }
);