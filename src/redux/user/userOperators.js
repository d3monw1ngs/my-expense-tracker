import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://expense-tracker.b.goit.study/api/';

// Fetch current user info
export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('users/current');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update User Info
export const updateUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async (userInfo, thunkAPI) => {
        try {
            const response = await axios.patch('users/info', userInfo);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update User Avatar 
export const updateUserAvatar = createAsyncThunk(
    'user/updateUserAvatar',
    async (avatarData, thunkAPI) => {
        try {
            const response = await axios.patch('users/avatar', avatarData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Delete User Avatar
export const deleteUserAvatar = createAsyncThunk(
    'user/deleteUserAvatar',
    async (_, thunkAPI) => {
        try {
            await axios.delete('users/avatar');
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);