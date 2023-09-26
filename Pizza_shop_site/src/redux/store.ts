import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import pizzaSlice from './slices/pizzaSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
   reducer: {
      filter: filterSlice,
      pizza: pizzaSlice,
      cart: cartSlice,
   },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
