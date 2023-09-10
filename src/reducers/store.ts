import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { billingReducer } from './billing/billing.reducer'

export const store = configureStore({
  reducer: {
    billing: billingReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
