import { createSlice } from '@reduxjs/toolkit'
import Login from '../components/Login'
import reducer from './cartSlice';

const initialState = {
    userData: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
            console.log("action",action.payload)
        },
        logout: (state, action) => {
            state.userData = null;
            state.isAuthenticated = false;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;   