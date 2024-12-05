import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './slices/page/pageSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
  },
})