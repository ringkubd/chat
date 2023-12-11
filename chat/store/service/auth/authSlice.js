import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setAuthCredentials : (state, payload) => {
            state.user = payload.user;
            state.token = payload.token;
        }
    }
})
export const { setAuthCredentials } = AuthSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default AuthSlice;
