import {createSlice} from "@reduxjs/toolkit";

const ErrorSlice = createSlice({
    name: 'error',
    initialState: {
        message: "",
        status: 404
    },
    reducers: {
        setErrors: (state, payload) => {
            state.message = payload.message;
            state.status = payload.status;
        }
    }
})

export const { setErrors }  = ErrorSlice.actions;

export default ErrorSlice;
