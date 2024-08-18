export const selectAllTransaction = state => state.transactions.transactions;
export const selectTransactionById = (state, transactionId) => 
    state.transactions.transactions.find((transaction) => transaction.id === transactionId);
export const selectTransactionsStatus = state => state.transactions.status;
export const selectTransactionsError = state => state.transactions.error;