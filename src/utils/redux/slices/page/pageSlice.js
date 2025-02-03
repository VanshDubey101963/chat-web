import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currPage: 'signin',
    navbarIndex: 0,
    chatIndex: -1,
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currPage = action.payload;
        },
        setNavbarIndex: (state, action) => {
            state.navbarIndex = action.payload;
        },
        setChatIndex: (state, action) => {
            state.chatIndex = action.payload
        }
    }
})

export const { setPage, setNavbarIndex, setChatIndex } = pageSlice.actions;
export default pageSlice.reducer;