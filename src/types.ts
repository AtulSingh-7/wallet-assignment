export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export type TxType = 'ADD' | 'WITHDRAW' | 'EXCHANGE'
export type TxStatus = 'SUCCESS' | 'FAILED' | 'PENDING'

export interface Transaction {
  id: string
  date: string // ISO
  type: TxType
  status: TxStatus
  amount: number
  currency: Currency
  notes?: string
  // for exchange
  fromCurrency?: Currency
  toCurrency?: Currency
  toAmount?: number
}