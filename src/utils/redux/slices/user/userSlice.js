import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const url = import.meta.env.VITE_SERVER_URL;

const initialState = {
    userID: '',
    username: '',
    email: '',
    avatar: '',
    friends: [],
    callHistory: [{
        id: "xyz",
        username: "vansh",
        avatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Favatar_6858504&psig=AOvVaw1NHOSGvdgqUUdgTzlDU6Zb&ust=1738673930754000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCSiqHHp4sDFQAAAAAdAAAAABAE",
        type: "voice",
        timestamp: "2024-11-11"
    }],
    friendRequests: [],
    users: [],
    usersStatus: 'idle',
    requestsStatus: 'idle',
    currentUserStatus: 'idle',
    currentUserIDStatus: 'idle',
    error: null
}


export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser',
    async (userID, thunkAPI) => {
        try {
            const response = await fetch(`${url}/users/fetchCurrentUser`, {
                method: 'GET',
                headers: {
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

export const fetchCurrentUserID = createAsyncThunk('users/fetchCurrentUserID',
    async (_, thunkAPI) => {
        const token = localStorage.getItem('token');

        if (!token) return;

        try {
            const response = await fetch(`${url}/signin/protectedData`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log("from thunk : ", data)
            return data.userID;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async (userID, thunkAPI) => {
        try {
            const response = await fetch(`${url}/users/fetchUsers`, {
                method: 'GET',
                headers: {
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
                headers: {
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
        },
        setOnlineFriend: (state, action) => {
            state.friends.forEach((friend, index) => {
                if (friend._id == action.payload._id) {
                    state.friends[index].isOnline = true
                }
            })
        },
        setOfflineFriend: (state, action) => {
            state.friends.forEach((friend, index) => {
                if (friend._id == action.payload._id) {
                    state.friends[index].isOnline = false
                }
            })
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
            .addCase(fetchUsers.rejected, (state, action) => {
                state.usersStatus = 'failed',
                    state.error = action.payload
            })

        builder
            .addCase(fetchCurrentUserID.fulfilled, (state, action) => {
                state.currentUserIDStatus = 'fulfilled'
                state.userID = action.payload?._id[0]._id
            })
            .addCase(fetchCurrentUserID.pending, (state) => {
                state.currentUserIDStatus = 'pending'
            })
            .addCase(fetchCurrentUserID.rejected, (state, action) => {
                state.currentUserIDStatus = 'failed'
                state.error = action.payload
                state.userID = null
            })

        builder
            .addCase(fetchFriendRequests.fulfilled, (state, action) => {
                state.requestsStatus = 'fulfilled',
                    state.friendRequests = action.payload.friendRequests
            })
            .addCase(fetchFriendRequests.pending, (state) => {
                state.requestsStatus = 'pending'
            })
            .addCase(fetchFriendRequests.rejected, (state, action) => {
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
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.currentUserStatus = 'failed',
                    state.error = action.payload
            })
    }
})

export const { setCurrentUserID, setOfflineFriend, setOnlineFriend } = userSlice.actions;
export default userSlice.reducer;