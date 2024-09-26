import { createSlice } from "@reduxjs/toolkit";
import { 
    register, 
    logIn,
    logOut,
    refreshUser, 
    resetPage,
    updateUser,
    updateAvatar
} from './authOperations';

// Utility function for pending state
const setAuthPending = (state) => {
    state.isLoggedIn = false;
    state.isRefreshing = true;
};

// Utiligy function for handling errors
const setAuthError = (state, action) => {
    state.isLoggedIn = false;
    state.error = action.payload;
    state.isRefreshing = false;
};

// Slice definition
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            name: null,
            email: null,
            avatarURL: null,
            currency: null,
            transactionsTotal: {
                income: 0,
                expenses: 0
            },
            categories: {
                income: [],
                expenses: []
            }
        },
        token: { aToken: null, rToken: null },
        sid: null,
        isLoading: false,
        isLoggedIn: false,
        isRegistered: false, 
        isRefreshing: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            // Registration handlers
           .addCase(register.pending, setAuthPending)
           .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isRefreshing = false;
           })
           .addCase(register.rejected, setAuthError)

            // Login handlers
            .addCase(logIn.pending, setAuthPending)
            .addCase(logIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.token;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(logIn.rejected, setAuthError)

            // Logout handler
            .addCase(logOut.fulfilled, (state) => {
                state.user = {
                    name: null,
                    email: null,
                    avatarURL: null,
                    currency: null,
                    transactionsTotal: {
                        income: 0,
                        expenses: 0,
                    },
                    categories: {
                        income: [],
                        expenses: [],
                    },
                };
                state.token = { aToken: null, rToken: null };
                state.sid = null;
                state.isLoggedIn = false;
                state.isRefreshing = false;
            })

            // Reset page handlers
            .addCase(resetPage.fulfilled, (state, action) => {
                state.token = {
                    aToken: action.payload.aToken,
                    rToken: action.payload.rToken
                };
            })
            .addCase(resetPage.rejected, (state, action) => {
                state.error = action.payload;
                state.isRefreshing = false;
            })

            // Refresh user handlers
            .addCase(refreshUser.pending, setAuthPending)
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.rejected, setAuthError)

            // Update user profile handlers
            .addCase(updateUser.pending, setAuthPending)
            .addCase(updateUser.fulfilled,  (state, action) => {
                state.isLoading = false;
                state.user.name = action.payload.name;
                state.user.currency = action.payload.currency;
                state.isRefreshing = false;
            })
            .addCase(updateUser.rejected, setAuthError)

            // Update avatar handlers
            .addCase(updateAvatar.pending, setAuthPending)
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user.avatarURL = action.payload.avatarURL;
                state.isRefreshing = false;
            })
            .addCase(updateAvatar.rejected, setAuthError);
    },
});

export const authReducer = authSlice.reducer;