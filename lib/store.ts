
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import pigeonReducer from './features/user/pigeonSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { thunk } from 'redux-thunk'

export const store = configureStore({
  reducer:{
    userReducer,
    pigeonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;