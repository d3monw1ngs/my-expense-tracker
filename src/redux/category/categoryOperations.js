import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Create a new transaction category
export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (newCategory, thunkAPI) => {
        try {
            const response = await axios.post('categories', newCategory);
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
    async (__, thunkAPI) => {
        try {
            const response = await axios.get('categories');
            return response.data;
        } catch (error) {
            console.error("Fetch categories error:", error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update user's transactions category
export const updateCategoriesThunk = createAsyncThunk(
    'categories/updateCategoriesThunk',
    async (updateCategories, thunkAPI) => {
        try {
            const { id } = updateCategories;
            const response = await axios.patch(`categories/${id}`, updateCategories);
            return response.data;
        } catch (error) {
            console.error('Update categories error:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Delete categories by ID
export const deleteCategories = createAsyncThunk(
    'categories/deleteCategories',
    async (categoryId, thunkAPI) => {
        try {
            await axios.delete(`categories/${categoryId}`);
            console.log('Deleted category:', categoryId);
            return categoryId;
        } catch (error) {
            console.error('Delete category error:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);