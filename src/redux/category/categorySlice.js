import { createSlice } from "@reduxjs/toolkit";
import { addCategory, fetchCategories, deleteCategories, updateCategoriesThunk } from "./categoryOperations";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {},
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
    }
})