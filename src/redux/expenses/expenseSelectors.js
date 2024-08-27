export const selectTotalIncome = (state) => state.expense.totalIncome;
export const selectTotalExpense = (state) => state.expense.totalExpense;
export const selectTransactions = (state) => state.expense.transactions;
export const selectExpenseLoading = (state) => state.expense.loading;
export const selectExpenseError = (state) => state.expense.error;