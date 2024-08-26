import { createSelector } from "reselect";

export const selectTransactions = (state) => state.transactions?.transactions || [];

export const selectAllTransaction = createSelector(
    [selectTransactions],
    (transactions) => transactions
);

export const selectTransactionsStatus = (state) => state.transactions?.status || 'idle';

export const selectTransactionsError = (state) => state.transactions?.error || null;