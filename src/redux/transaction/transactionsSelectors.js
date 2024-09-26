import { createSelector } from "@reduxjs/toolkit";
import { selectCategory } from "../../redux/category/categorySelectors";

export const selectTransaction = state => state.transaction.item;
export const selectIsLoading = state => state.transaction.isLoading;
export const selectSearchQuery = state => state.transaction.search;

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

export const selectTransactionTotal = createSelector([selectTransaction],
    (transaction) => {
        const expenses = transaction
            .expenses
            .reduce((total, expense) => 
                total += expense.sum, 0);
        const income = transaction
            .income
            .reduce((total, income) => 
                total =+ income.sum, 0);
        
        return { expenses, income };
});

export const selectVisibleTransaction = createSelector(
    [selectSearchQuery, selectTransaction],
    (searchQuery, transaction) => {
        const type = searchQuery.type || 'expenses';
        const keyword = searchQuery.keyword ? searchQuery.keyword.toLowerCase() : '';
        const date = searchQuery.date || '';

        const matchesKeyword = (data) =>
            data.comment.toLowerCase().includes(keyword) ||
            data.category.categoryName.toLowerCase().includes(keyword);
        
        const matchesDate = (data) => data.date === date;

        return transaction[type].filter(data => {
            const keywordMatch = matchesKeyword(data);
            const dateMatch = date === '' || matchesDate(data);

            return keywordMatch && dateMatch;
        });
    }
);

export const selectExpenseAvg = createSelector(
    [selectTransaction, selectCategory],
    (transaction, category) => {
        const expenseCategories = category.expenses;
        const expenses = transaction.expenses;
        const categoryCount = {};

        if (expenseCategories.length === 0 || expenses.length === 0) {
            return [];
        }

        // Count occurrences of each category in the transactions
        expenses.forEach(transaction => {
            const categoryName = transaction.category.categoryName;
            categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
        });

        const categoryKeys = Object.keys(categoryCount);
        const totalTransactions = categoryKeys.reduce((total, key) => total + categoryCount[key], 0);

        // Create average representation for each category
        const averageData = categoryKeys.map(key => ({
            name: key,
            value: Math.round((categoryCount[key] * 100) / totalTransactions),
            color: getRandomHexColor(),
        }));

        return averageData;
    }
);
