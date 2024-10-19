import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

// Initial State
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    role: null,
};

// Thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password, role }, { rejectWithValue }) => {
    try {
        console.log("Sending Login Request:", { email, password, role });
        const response = await instance.post("/api/login", { email, password, role });
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response.data);
        return rejectWithValue(error.response.data || "Login failed");
    }
});

// Thunk for Register
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await instance.post("/api/register", userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Thunk for Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
    await instance.post("/api/logout");
    return null;
});

// Create the slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;
