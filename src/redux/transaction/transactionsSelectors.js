import { createSelector } from "@reduxjs/toolkit";
import { selectCategory } from "../../redux/category/categorySelectors";

export const selectTransaction = state => {
    console.log('Current state of transactons:', state.transactions);
    return state.transactions?.item || { expenses: [], income: [] };
};
export const selectIsLoading = state => {
    console.log('Is loading:', state.transactions?.isLoading);
    return state.transactions?.isLoading || false;
};
export const selectSearchQuery = state => {
    console.log('Current Search Query:', state.transactions?.search);
    return state.transactions?.search || { keyword: '', date: '', type: '' };
};
export const selectExpenses = state => state.transactios?.expenses || [];

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

export const selectTransactionTotal = createSelector(
    [state => state.transactions],
    (transactions = {}) => {
      const expenses = transactions?.expenses || [];
      const incomes = transactions?.incomes || [];
      
      const totalExpenses = expenses.reduce((total, expense) => total + expense.sum, 0);
      const totalIncomes = incomes.reduce((total, income) => total + income.sum, 0);
  
      return { totalExpenses, totalIncomes };
    }
  );

export const selectVisibleTransaction = createSelector(
    [selectSearchQuery, selectTransaction],
    (searchQuery, transaction) => {
        const type = searchQuery.type || 'expenses';

        // Check if transaction and type are valid
        if (!transaction || !transaction[type]) {
            console.warn('Transaction or type is invalid:', transaction, type);
            return [];
        }

        const keyword = searchQuery.keyword ? searchQuery.keyword.toLowerCase() : '';
        const date = searchQuery.date || '';

        const matchesKeyword = (data) =>
            data.comment.toLowerCase().includes(keyword) ||
            data.category?.categoryName?.toLowerCase().includes(keyword);
        
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
        const expenseCategories = category?.expenses || [];
        const expenses = transaction?.expenses || [];
        const categoryCount = {};

        if (expenseCategories.length === 0 || expenses.length === 0) {
            return [];
        }

        // Count occurrences of each category in the transactions
        expenses.forEach(transactionItem => {
            const categoryName = transactionItem?.category?.categoryName;

            if (categoryName) {
                categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
            }
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
