import { createSlice } from "@reduxjs/toolkit";
import { addCategory, fetchCategories, deleteCategory, updateCategory } from "./categoryOperations";

// Utility function for pending state
const setAuthPending = state => {
    state.isLoading = true;
    state.isError = null;
}

// Utility function for handling errors
const setAuthError = (state, action) => {
    state.isLoading = false;
    state.isError = action.payload;
}

// Slice definition
export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        items: {
            expenses: [],
            income: [],
        },
        isLoading: false,
        isError: null
    },
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategories.pending, setAuthPending)
            .addCase(fetchCategories.fulfilled, (state, action) => {
                const { expenses = [], income = [] } = action.payload || {};

                state.isLoading = false;
                state.items = { expenses, income };
                state.isError = null;
            })
            .addCase(fetchCategories.rejected, setAuthError)

            // Add Category
            .addCase(addCategory.pending, setAuthPending)
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                // Add the new category to the corresponding array
                const { type, category } = action.payload;
                state.items[type].push(category);
            })
            .addCase(addCategory.rejected, setAuthError)

            // Delete Category
            .addCase(deleteCategory.pending, setAuthPending)
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const { type, id } = action.payload;

                // Ensure we find the index safely
                const categoryList = state.items[type] || [];
                state.items[type] = categoryList.filter(category => category._id !== id);

                state.isLoading = false;
                state.isError = null;                
            })
            .addCase(deleteCategory.rejected, setAuthError)

            // Update Category
            .addCase(updateCategory.pending, setAuthPending)
            .addCase(updateCategory.fulfilled, (state, action) => {
                const { type, _id } = action.payload;

                // Ensure we have a valid category list for the given type
                const categoryList = state.items[type] || [];

                // Use map to create a new array with the updated category
                state.items[type] = categoryList.map(category => 
                    category._id === _id ? action.payload : category
                );

                state.isLoading = false;
                state.isError = null
            })
            .addCase(updateCategory.rejected, setAuthError)            
    }
});

export const categoryReducer = categorySlice.reducer;