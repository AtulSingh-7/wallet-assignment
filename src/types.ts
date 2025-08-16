export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export type TxType = 'ADD' | 'WITHDRAW' | 'EXCHANGE'
export type TxStatus = 'SUCCESS' | 'FAILED' | 'PENDING'

export interface Transaction {
  id: string
  date: string 
  type: TxType
  status: TxStatus
  amount: number
  currency: Currency
  notes?: string
 
  fromCurrency?: Currency
  toCurrency?: Currency
  toAmount?: number
}