import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser, updateUserAvatar, updateUserInfo, deleteUserAvatar } from "./userOperators";

const initialState = {
    userInfo: null,
    status: 'idle',
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.userInfo.avatar = action.payload.avatar;
            })
            .addCase(deleteUserAvatar.fulfilled, (state) => {
                state.userInfo.avatar = null;
            });
    },
});