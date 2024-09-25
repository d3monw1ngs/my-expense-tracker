import axios from "axios";

const api = axios.create({
    baseURL: 'https://expense-tracker.b.goit.study/api'
});

// Auth endpoints
export const signup = async (userData) => {
    try {
        console.log('Sending signup request with data:', userData);
        const response = await api.post('/auth/register', userData);
        console.log('Signup response:', response.data);
        return response.data;
    } catch (error) {
        console.log('Signup error:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        console.log('Sending login request with data:', userData);
        const response = await api.post('/auth/login', userData);
        console.log('Logn response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        console.log('Sending logout request');
        const response = await api.get('/auth/logout');
        console.log('Logout response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// User endpoints
export const fetchCurrentUser = async () => {
    try {
        console.log('Fetching current user data');
        const response = await api.get('/users/current');
        console.log('Current user response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch current user error:', error);
        throw error;
    }
};

export const updateUser = async (userData) => {
    try {
        console.log('Updating user with data:', userData);
        const response = await api.patch('/users/info', userData);
        console.log('Update user resonse:', response.data);
        return response.data;
    } catch (error) {
        console.error('Update user error:', error);
        throw error;
    }
};

export const updateAvatar = async (avatarData) => {
    try {
        const formData = new FormData();
        formData.append('avatar', avatarData);

        console.log('Updating user avatar with data:', avatarData);
        const response = await api.patch('/users/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Update avatar response:', response.data);
        return response.data.avatarUrl;
    } catch (error) {
        console.error('Update avatar error:', error);
        throw error;
    }
};

export const deleteAvatar = async (avatarId) => {
    try {
        console.log('Deleting user avatar with ID:', avatarId);
        const response = await api.delete(`/users/avatar/${avatarId}`);
        console.log('Delete avatar response:', response.data);
        return response.data.avatarUrl;
    } catch (error) {
        console.error('Delete avatar error:', error);
        throw error;
    }
};

// Category endpoints
export const fetchCategories = async () => {
    try {
        console.log('Fetching categories');
        const response = await api.get('/categories');
        console.log('Categories response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch categories error:', error);
        throw error;
    }
};

export const addCategory = async (categoryData) => {
    try {
        console.log('Adding category with data:', categoryData);
        const response = await api.post('/categories', categoryData);
        console.log('Add category response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Add category error:', error);
        throw error;
    }
};

export const updateTransactionCategory = async (categoryData) => {
    try {
        console.log('Updating transaction category with data:', categoryData);
        const response = await api.patch(`/categories/${categoryData._id}`, categoryData);
        console.log('Update transaction category response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Update transaction category error:', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        console.log('Deleting category with ID:', categoryId);
        const response = await api.delete(`/categories/${categoryId}`);
        console.log('Delete category response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Delete category error:', error);
        throw error;
    }
};

// Transaction endpoints
export const fetchTransactions = async () => {
    try {
        console.log('Fetching transactions');
        const response = await api.get('/transactions');
        console.log('Transactions response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch transactions error:', error);
        throw error;
    }
};

export const fetchTransactionsByType = async (type) => {
    try {
        console.log('Fetching transactions of type:', type);
        const response = await api.get(`/transactions/${type}`);
        console.log('Transactions by type response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fetch transactions by type error:', error);
        throw error;
    }
};

export const addTransaction = async (transactionData) => {
    try {
        console.log('Adding transaction with data:', transactionData);
        const response = await api.post('/transactions', transactionData);
        console.log('Add transaction response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Add transaction error:', error);
        throw error;
    }
};

export const deleteTransaction = async (transactionId) => {
    try {
        console.log('Deleting transaction with ID:', transactionId);
        const response = await api.delete(`/transactions/${transactionId}`);
        console.log('Delete transaction response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Delete transaction error:', error);
        throw error;
    }
};

export const updateTransaction = async (type, id, transactionData) => {
    try {
        console.log('Updating transaction of type:', type, 'with ID:', id, 'and data:', transactionData);
        const response = await api.patch(`/transactions/${type}/${id}`, transactionData);
        console.log('Update transaction response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Update transaction error:', error);
        throw error;
    }
};