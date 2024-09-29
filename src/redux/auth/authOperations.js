import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Helper functions to set and clear Authorization headers
export const setAuthHeader = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const requestParams = thunkAPI => {
    const state = thunkAPI.getState();
    const rToken = state.auth.token.refreshToken;
    const aToken = state.auth.token.accessToken;
    const sid = state.auth.sid;

    return { rToken, aToken, sid };
}

// Async Thunks for Authentication Actions

// Register a new user
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await axios.post('auth/register', { name, email, password });
                setAuthHeader(response.data.aToken);              
                return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.status);
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
                setAuthHeader(response.data.aToken);
                // console.log("Auth state:", thunkAPI.getState().auth);
                return response.data;
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
            const { rToken } = requestParams(thunkAPI);
            const response = await axios.get('auth/logout', { params: { refreshToken: rToken } });
            setAuthHeader(null);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

// Refresh the user's token
export const resetPage = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const { rToken, sid } = requestParams(thunkAPI);

        if (!rToken) {
            return thunkAPI.rejectWithValue('No refresh token found.');
        }
        try {
            // Get a new access token using the refresh token
            const response = await axios.post('auth/refresh', {sid});
            console.log('Refresh response:', response.data);
            const { aToken, rToken } = response.data;
            setAuthHeader(aToken);
         
            return { aToken, rToken, sid };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Token refresh failed');
        }
    }
);

// Get current user
export const refreshUser = createAsyncThunk(
    'users/current',
    async(_, thunkAPI) => {
        const { aToken } = requestParams(thunkAPI);

        if (!aToken) {
            return thunkAPI.rejectWithValue('Failed to fetch user');
        }

        try {
            setAuthHeader(aToken);
            const response = await axios.get('/users/current');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update user information
export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async({ name, currency }, thunkAPI) => {
        try {
            const {aToken} = requestParams(thunkAPI);
            setAuthHeader(aToken);
            const response = await axios.patch('users/info', { name, currency });
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update user's avatar
export const updateAvatar = createAsyncThunk(
    'auth/updateAvatar',
    async(avatarUrl, thunkAPI) => {
        try {
            console.log(avatarUrl);
            const { aToken } = requestParams(thunkAPI);
            setAuthHeader(aToken);
            const response = await axios.patch('users/avatar', avatarUrl);
            return response.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
);