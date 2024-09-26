import axios from "axios";
import { requestParams, setAuthHeader } from "../../redux/auth/authOperations";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Create a new transaction category
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async ({ type, categoryName }, thunkAPI) => {
        try {
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            const response = await axios.post('categories', { type, categoryName });
            return response.data;
        } catch (error) {
            console.error("Add categories error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Fetch user's transactions categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, thunkAPI) => {
        try {
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            const response = await axios.get('categories');
            return response.data;
        } catch (error) {
            console.error("Fetch categories error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update user's transactions category
export const updateCategory = createAsyncThunk(
    'categories/updateCategory',
    async ({ id, categoryName, type }, thunkAPI) => {
        try {
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            const response = await axios.patch(`categories/${id}`, { categoryName });
            const data = { ...response.data, type }
            return data;
        } catch (error) {
            console.error('Update categories error:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Delete categories by ID
export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async ({id, type}, thunkAPI) => {
        try {
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            await axios.delete(`categories/${id}`, type);
            return { id, type };
        } catch (error) {
            console.error('Delete category error:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);