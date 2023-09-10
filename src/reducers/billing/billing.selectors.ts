import { RootState } from '../store'

export const selectPendingBills = (state: RootState) => state.billing.pendingBills

export const selectBills = (state: RootState) => state.billing.bills

export const selectRequestFinished = (state: RootState) => state.billing.requestFinished

export const selectPayments = (state: RootState) => state.billing.payments
