import { User } from '@/common/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: User | null;
    jwt: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    jwt: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setUser: (state, action) => {
            const { id, address } = action.payload;
            state.user = { id, address };
            state.jwt = action.payload.jwt || localStorage.getItem('jwt');
            state.isAuthenticated = true;
        },

        logout: (state) => {
            state.user = null;
            state.jwt = null;
            localStorage.removeItem('jwt');
            state.isAuthenticated = false;
        }

    }
})

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
