import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';

export const makeStore = () => {
    const rootReducer = combineReducers({user: userSlice, cart: cartSlice,order:orderSlice });
  return configureStore({
    reducer: rootReducer
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']