import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './slices/page/pageSlice'
import userReducer from './slices/user/userSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
  },
})