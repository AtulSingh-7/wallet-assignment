import type { Currency } from '@/types'

export const RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.009
}

export function convert(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount
  const amountInINR = amount / RATES[from] 
  return amountInINR * RATES[to]
}

export function format(amount: number, currency: Currency) {
  const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'
  return `${symbol}${amount.toFixed(2)}`
}