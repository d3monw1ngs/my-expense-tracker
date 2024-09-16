import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Helper functions to set and clear Authorization headers
export const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    delete axios.defaults.headers.common.Authorization;
};

// Async Thunks for Authentication Actions

// Register a new user
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password}, thunkAPI) => {
        try {
            const response = await axios.post('auth/register', { name, email, password });
                setAuthHeader(response.data.accessToken);              
                return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            return thunkAPI.rejectWithValue(message);
        }
    } 
);

// Log in a user
export const logIn = createAsyncThunk(
    'auth/logIn',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await axios.post('auth/login', {email, password});
                // Set the token after a successful login
                setAuthHeader(response.data.accessToken);
            // Get current user info after login
            const userInfo = await axios.get('users/current');
                return { ...response.data, userInfo: userInfo.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Log out a user
export const logOut = createAsyncThunk(
    'auth/logOut',
    async (_, thunkAPI) => {
        try {
            await axios.get('auth/logout');
            clearAuthHeader(); // Clear the token after logout
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

// Refresh the user's token
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.refreshToken;

        if (!persistedToken) {
            return thunkAPI.rejectWithValue('No refresh token found.');
        }
        try {
            setAuthHeader(persistedToken);

            // Get a new access token using the refresh token
            const response = await axios.post('auth/refresh');
            const { accessToken, refreshToken } = response.data;
            // Update the headers with teh new access token
            setAuthHeader(accessToken);

            return { accessToken, refreshToken };
        } catch (error) {
            clearAuthHeader();
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Token refresh failed');
        }
    }
);