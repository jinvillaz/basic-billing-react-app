export interface Payment {
  id: number
  clientId: number
  billId: number
  paymentDate: Date
}

export interface PaymentRequest {
  clientId: number
  period: number
  category: string
}
