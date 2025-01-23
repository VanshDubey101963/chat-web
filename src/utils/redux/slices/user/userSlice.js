import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const url = import.meta.env.VITE_SERVER_URL;

const initialState = {
    userID: '',
    username: '',
    email: '',
    avatar: '',
    friends: [],
    friendRequests: [],
    users: [],
    usersStatus: 'idle',
    requestsStatus: 'idle',
    currentUserStatus: 'idle',
    error: null
}


export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser',
    async (userID, thunkAPI) => {
        console.log('thunk used')
        try {
            const response = await fetch(`${url}/users/fetchCurrentUser`, {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${userID}`
                }
            })

            const data = await response.json()
            return data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (userID, thunkAPI) => {
        try {
            const response = await fetch(`${url}/users/fetchUsers`, {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${userID}`
                }
            })
            const data = await response.json()
            return data;
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const fetchFriendRequests = createAsyncThunk('users/fetchFriendRequests',
    async (userID, thunkAPI) => {
        try {
            const response = await fetch(`${url}/users/fetchRequests`, {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${userID}`
                }
            })

            const data = await response.json()
            return data
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUserID: (state, action) => {
            state.userID = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersStatus = 'fulfilled',
                    state.users = action.payload.users
            })
            .addCase(fetchUsers.pending, (state) => {
                state.usersStatus = 'pending'
            })
            .addCase(fetchUsers.rejected, (state,action) => {
                state.usersStatus = 'failed',
                    state.error = action.payload
            })

        builder
            .addCase(fetchFriendRequests.fulfilled, (state, action) => {
                state.requestsStatus = 'fulfilled',
                    state.friendRequests = action.payload.friendRequests
            })
            .addCase(fetchFriendRequests.pending, (state) => {
                state.requestsStatus = 'pending'
            })
            .addCase(fetchFriendRequests.rejected, (state,action) => {
                state.requestsStatus = 'failed',
                    state.error = action.payload
            })

        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.currentUserStatus = 'fulfilled'
                const currentUser = action.payload.currentUser
                state.username = currentUser?.username
                state.email = currentUser?.email
                state.avatar = currentUser?.avatar
                state.friends = currentUser?.friends
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.currentUserStatus = 'pending'
            })
            .addCase(fetchCurrentUser.rejected, (state,action) => {
                state.currentUserStatus = 'failed',
                    state.error = action.payload
            })
    }
})

export const { setCurrentUserID } = userSlice.actions;
export default userSlice.reducer;