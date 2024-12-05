import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currPage: 'signup',
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currPage = action.payload;
        }
    }
})

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;