import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './slices/page/pageSlice'
import socketReducer from './slices/socket/socketSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    io: socketReducer
  },
})