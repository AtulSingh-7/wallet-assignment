import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
import type { Currency, Transaction, TxStatus, TxType } from '@/types'
import { convert } from '../utils/currency'

type Balances = Record<Currency, number>

interface State {
  isAuthed: boolean
  phone?: string
  balances: Balances
  transactions: Transaction[]
}

interface Actions {
  login: (phone: string) => void
  logout: () => void
  addFunds: (amount: number, currency: Currency) => void
  withdrawFunds: (amount: number, currency: Currency) => void
  exchange: (amount: number, from: Currency, to: Currency) => void
  recent: () => Transaction[]
}

const initialBalances: Balances = { INR: 1000, USD: 0, EUR: 0, GBP: 0 }

export const useWalletStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      isAuthed: false,
      phone: undefined,
      balances: initialBalances,
      transactions: [],

      login: (phone) => set({ isAuthed: true, phone }),
      logout: () => set({ isAuthed: false }),

      addFunds: (amount, currency) => {
        const { balances, transactions } = get()
        const newBal = { ...balances, [currency]: balances[currency] + amount }
        const tx: Transaction = {
          id: uuid(),
          date: new Date().toISOString(),
          type: 'ADD',
          status: 'SUCCESS',
          amount,
          currency,
          notes: 'Add Funds'
        }
        set({ balances: newBal, transactions: [tx, ...transactions].slice(0, 5000) })
      },

      withdrawFunds: (amount, currency) => {
        const { balances, transactions } = get()
        if (balances[currency] < amount) {
          const tx: Transaction = {
            id: uuid(),
            date: new Date().toISOString(),
            type: 'WITHDRAW',
            status: 'FAILED',
            amount,
            currency,
            notes: 'Insufficient funds'
          }
          set({ transactions: [tx, ...transactions] })
          return
        }
        const newBal = { ...balances, [currency]: balances[currency] - amount }
        const tx: Transaction = {
          id: uuid(),
          date: new Date().toISOString(),
          type: 'WITHDRAW',
          status: 'SUCCESS',
          amount,
          currency,
          notes: 'Withdraw Funds'
        }
        set({ balances: newBal, transactions: [tx, ...transactions].slice(0, 5000) })
      },

      exchange: (amount, from, to) => {
        const { balances, transactions } = get()
        if (from === to) return
        if (balances[from] < amount) {
          const tx: Transaction = {
            id: uuid(),
            date: new Date().toISOString(),
            type: 'EXCHANGE',
            status: 'FAILED',
            amount,
            currency: from,
            fromCurrency: from,
            toCurrency: to,
            notes: 'Insufficient funds'
          }
          set({ transactions: [tx, ...transactions] })
          return
        }
        const toAmount = convert(amount, from, to)
        const newBal = { ...balances, [from]: balances[from] - amount, [to]: balances[to] + toAmount }
        const tx: Transaction = {
          id: uuid(),
          date: new Date().toISOString(),
          type: 'EXCHANGE',
          status: 'SUCCESS',
          amount,
          currency: from,
          fromCurrency: from,
          toCurrency: to,
          toAmount: Number(toAmount.toFixed(2)),
          notes: 'Currency Exchange'
        }
        set({ balances: newBal, transactions: [tx, ...transactions].slice(0, 5000) })
      },

      recent: () => get().transactions.slice(0, 5),
    }),
    {
      name: 'wallet-store'
    }
  )
)