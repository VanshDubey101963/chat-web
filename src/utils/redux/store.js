import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './slices/page/pageSlice'
import userReducer from './slices/user/userSlice'
import socketReducer from './slices/socket/socketSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    socketReducer: socketReducer,
  },
})