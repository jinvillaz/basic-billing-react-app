import axios, { AxiosError } from 'axios'
import { Bill } from '../../model/Bill'
import { Payment, PaymentRequest } from '../../model/Payment'

const api = process.env.REACT_APP_API_URL + '/billing'

interface ErrorData {
  errors: string[]
}

class BillService {
  async getBillsPendingByClientId(id: string): Promise<Bill[]> {
    const { data } = await axios.get(`${api}/pending/${id}`)
    return data
  }

  async getPaymentHistoryByClientId(id: string): Promise<Payment[]> {
    const { data } = await axios.get(`${api}/payment-history/${id}`)
    return data
  }

  async getBillsByCategory(category: string): Promise<Bill[]> {
    const { data } = await axios.get(`${api}/search?category=${category}`)
    return data
  }

  async createPayment(body: PaymentRequest): Promise<Payment> {
    try {
      const { data } = await axios.post(`${api}/pay`, body)
      return data
    } catch (error) {
      console.info('createPayment ', error)
      let message = (error as Error).message
      if (axios.isAxiosError(error)) {
        const errorAxios = (error as AxiosError).response?.data
        message = (errorAxios as ErrorData).errors[0]
      }
      throw new Error(message)
    }
  }
}

export const billService = new BillService()
