import { createReducer } from '@reduxjs/toolkit'
import { Bill } from '../../model/Bill'
import {
  createPayment,
  getBillsByCategory,
  getBillsPendingByClientId,
  getPaymentHistoryByClientId,
  resetStatus,
} from './billing.actions'
import { Payment } from '../../model/Payment'
import { toast } from 'react-toastify'

interface BillState {
  pendingBills: Bill[]
  bills: Bill[]
  payments: Payment[]
  requestFinished: boolean
}

const initialState: BillState = {
  pendingBills: [],
  bills: [],
  requestFinished: false,
  payments: [],
}

export const billingReducer = createReducer(initialState, builder => {
  builder.addCase(getBillsPendingByClientId.pending, state => ({
    ...state,
    pendingBills: [],
    requestFinished: false,
  }))

  builder.addCase(getBillsPendingByClientId.rejected, state => ({
    ...state,
    pendingBills: [],
    requestFinished: false,
  }))

  builder.addCase(getBillsPendingByClientId.fulfilled, (state, action) => ({
    ...state,
    pendingBills: action.payload,
    requestFinished: true,
  }))

  builder.addCase(resetStatus, state => ({
    ...state,
    requestFinished: false,
  }))

  builder.addCase(getPaymentHistoryByClientId.pending, state => ({
    ...state,
    payments: [],
    requestFinished: false,
  }))

  builder.addCase(getPaymentHistoryByClientId.rejected, state => ({
    ...state,
    payments: [],
    requestFinished: false,
  }))

  builder.addCase(getPaymentHistoryByClientId.fulfilled, (state, action) => ({
    ...state,
    payments: action.payload,
    requestFinished: true,
  }))

  builder.addCase(getBillsByCategory.pending, state => ({
    ...state,
    bills: [],
    requestFinished: false,
  }))

  builder.addCase(getBillsByCategory.rejected, state => ({
    ...state,
    bills: [],
    requestFinished: false,
  }))

  builder.addCase(getBillsByCategory.fulfilled, (state, action) => ({
    ...state,
    bills: action.payload,
    requestFinished: true,
  }))

  builder.addCase(createPayment.pending, state => ({
    ...state,
    requestFinished: false,
  }))

  builder.addCase(createPayment.rejected, (state, action) => {
    toast.error(action.error.message)
    return {
      ...state,
      requestFinished: false,
    }
  })

  builder.addCase(createPayment.fulfilled, state => {
    toast.info('Payment was created!')
    return {
      ...state,
    }
  })
})
