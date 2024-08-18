import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

export const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

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

export const logIn = createAsyncThunk(
    'auth/login',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await axios.post('auth/login', {email, password});
                setAuthHeader(response.data.accessToken);
                thunkAPI.dispatch();
                return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.get('auth/logout');
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.refreshToken;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }
        try {
            setAuthHeader(persistedToken);
            const response = await axios.post('auth/refresh');
            const { accessToken, refreshToken } = response.data;
            setAuthHeader(`Bearer ${accessToken}`);
            return { accessToken, refreshToken };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);