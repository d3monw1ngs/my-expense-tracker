import { createSelector } from "reselect";

export const selectTransactionsState = (state) => state.transactions;

export const selectAllTransaction = createSelector(
    [selectTransactionsState],
    (transactionsState) => transactionsState.transactions
);

export const selectTransactionsStatus = createSelector(
    [selectTransactionsState],
    (transactionsState) => transactionsState.status
);

export const selectTransactionsError = createSelector(
    [selectTransactionsState],
    (transactionsState) => transactionsState.error
);
