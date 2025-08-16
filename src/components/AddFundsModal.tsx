import { useState } from 'react'
import { useWalletStore } from '../store/wallet'
import type { Currency } from '../types'

interface Props {
  onClose: () => void
}

export default function AddFundsModal({ onClose }: Props) {
  const addFunds = useWalletStore(s => s.addFunds)
  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<Currency>('INR')

  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
      <div className="card max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Add Funds</h3>
        <div className="space-y-3">
          <div>
            <label className="label">Amount</label>
            <input className="input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <label className="label">Currency</label>
            <select className="input" value={currency} onChange={e => setCurrency(e.target.value as Currency)}>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="flex gap-2 justify-end">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-primary"
              onClick={() => { addFunds(Number(amount), currency); onClose(); }}
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}