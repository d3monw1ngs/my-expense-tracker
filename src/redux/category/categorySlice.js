import { createSlice } from "@reduxjs/toolkit";
import { addCategory, fetchCategories, deleteCategories, updateCategoriesThunk } from "./categoryOperations";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch categories';
            })
            .addCase(addCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCategories.fulfilled, (state, action) => {
                state.status = 'failed';
                state.items = state.items.filter(category => category.id !== action.payload);
            })
            .addCase(deleteCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateCategoriesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCategoriesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.items.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateCategoriesThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});