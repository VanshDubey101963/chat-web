import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    io: null
}

export const socketSlice = createSlice({
    name: 'io',
    initialState,
    reducers: {
        setSocketInstance: (state,action) => {
            state.io = action.payload
        }
    }
});

export const { setSocketInstance } = socketSlice.actions;
export default socketSlice.reducer;