import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    username: '',
    avatar: '',
    isOnline: false,
    messages: [],

}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatNavbar: (state, action) => {
            console.log("reached here")
            state.username = action.payload.username
            state.avatar = action.payload.avatar
            state.isOnline = action.payload.isOnline
            state._id = action.payload.index
        },

        setSelectedChatNavbarIsOnline: (state, action) => {
            if (state._id == action.payload._id) {
                state.isOnline = action.payload.isOnline
            }
        },

    }
})

export const { setChatNavbar, setSelectedChatNavbarIsOnline } = chatSlice.actions;
export default chatSlice.reducer;