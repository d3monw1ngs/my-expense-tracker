import axios from "axios";

const API_BASE_URL = 'https://expense-tracker.b.goit.study/api';

// Fetch expense data for the logged-in user
export const fetchExpenseData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/expenses`);
        const { data } = response;

        const expenseData = {
            totalIncome: data.totalIncome || 0,
            totalExpense: data.totalExpense || 0,
            transactions: data.transactions || [],
        };
        return expenseData;
    } catch (error) {
        console.error('Error fetching expense data:', error);
        throw error;
    }
};