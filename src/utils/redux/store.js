import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './slices/page/pageSlice'
import userReducer from './slices/user/userSlice'
import chatReducer from './slices/chat/chatSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})