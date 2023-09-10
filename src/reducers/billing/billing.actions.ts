import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { billService } from './billing.service'
import { Bill } from '../../model/Bill'
import { Payment, PaymentRequest } from '../../model/Payment'

export const resetStatus = createAction('billing/resetStatus')

export const getBillsPendingByClientId = createAsyncThunk<Bill[], string>(
  'billing/getBillsPendingByClientId',
  async (id: string): Promise<Bill[]> => {
    return await billService.getBillsPendingByClientId(id)
  },
)

export const getPaymentHistoryByClientId = createAsyncThunk<Payment[], string>(
  'billing/getPaymentHistoryByClientId',
  async (id: string): Promise<Payment[]> => {
    return await billService.getPaymentHistoryByClientId(id)
  },
)

export const getBillsByCategory = createAsyncThunk<Bill[], string>(
  'billing/getBillsByCategory',
  async (category: string): Promise<Bill[]> => {
    return await billService.getBillsByCategory(category)
  },
)

export const createPayment = createAsyncThunk<Payment, PaymentRequest>(
  'billing/createPayment',
  async (data: PaymentRequest): Promise<Payment> => {
    return await billService.createPayment(data)
  },
)
