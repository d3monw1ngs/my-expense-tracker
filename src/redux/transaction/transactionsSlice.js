import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchTransactions, 
    updateTransaction, 
    addTransaction, 
    deleteTransaction 
} from "./transactionsOperators";

// Utility function for pending state
const handlePending = (state) => {
    state.isLoading = true;
    state.isError = null;
};

// Utility function for setting fulfilled state
const handleFulfilled = (state, action, type) => {
    state.item[type] = action.payload.data;
    state.isLoading = false;
    state.isError = null;
}

// Utility function for handling errors
const handleError = (state, action) => {
    console.error('Error occurred:', action.error.message);
    state.isLoading = false;
    state.isError = action.error.message;
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        item: {
            expenses: [],
            income: []
        },
        isLoading: false,
        isError: null,
        search: {
            keyword: '',
            date: '',
            type: ''
        }
    },
    reducers: {
        searchTransaction: (state, action) => {
            const { keyword, date, type = 'expenses' } = action.payload;
            state.search = { keyword, date, type };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch transactions
            .addCase(fetchTransactions.pending, handlePending)
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                const type = action.payload.type || 'expenses';
                if (state.item[type]) {
                    handleFulfilled(state, action, type);
                }
            })
            .addCase(fetchTransactions.rejected, handleError)

            // Add transaction
            .addCase(addTransaction.pending, handlePending)
            .addCase(addTransaction.fulfilled, (state, action) => {
                const {type, data} = action.payload;
                if (state.item[type]) {
                    state.item[type].push(data);
                }
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(addTransaction.rejected, handleError)

            // Update transaction
            .addCase(updateTransaction.pending, handlePending)
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const { type, _id } = action.payload;
                const index = state.item[type].findIndex(tx => tx._id === _id);
                if (index !== -1) {
                    state.item[type][index] = action.payload.data;
                }
                state.isLoading = false;
            })
            .addCase(updateTransaction.rejected, handleError)

            // Delete Transaction
            .addCase(deleteTransaction.pending, handlePending)
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                const { type, id } = action.payload;
                state.item[type] = state.item[type].filter(tx => tx._id !== id);
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(deleteTransaction.rejected, handleError);
    },
});

export const { searchTransaction } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;