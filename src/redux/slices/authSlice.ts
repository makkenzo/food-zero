import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: {
        displayName: string | null;
        email: string | null;
        phoneNumber: string | null;
        photoURL: string | null | undefined;
        providerId: string | null;
        uid: string | null;
    };
}

const initialState: AuthState = {
    user: {
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        providerId: null,
        uid: null,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
        },
    },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
