export interface Bill {
  id: number
  clientId: number
  period: number
  amount: number
  category: BillCategory
  state: BillState
}

export enum BillCategory {
  WATER = 'WATER',
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
  INTERNET = 'INTERNET',
  TELEPHONY = 'TELEPHONY',
}

export enum BillState {
  PENDING = 'Pending',
  PAYED = 'Paid',
}
