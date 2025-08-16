import { useState } from 'react'
import { useWalletStore } from '../store/wallet'
import type { Currency } from '../types'
import { convert, format } from '../utils/currency'

interface Props { onClose: () => void }

export default function ExchangeModal({ onClose }: Props) {
  const exchange = useWalletStore(s => s.exchange)
  const [amount, setAmount] = useState<number>(0)
  const [from, setFrom] = useState<Currency>('INR')
  const [to, setTo] = useState<Currency>('USD')
  const preview = amount ? format(convert(amount, from, to), to) : ''

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="card max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Exchange Currency</h3>
        <div className="space-y-3">
          <div>
            <label className="label">Amount</label>
            <input className="input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">From</label>
              <select className="input" value={from} onChange={e => setFrom(e.target.value as Currency)}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="label">To</label>
              <select className="input" value={to} onChange={e => setTo(e.target.value as Currency)}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>
          {preview && <p className="text-sm text-gray-600">You will receive approximately <span className="font-medium">{preview}</span></p>}
          <div className="flex gap-2 justify-end">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={() => { exchange(Number(amount), from, to); onClose(); }}>Exchange</button>
          </div>
        </div>
      </div>
    </div>
  )
}