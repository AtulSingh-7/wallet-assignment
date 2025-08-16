import { useState } from 'react'
import { useWalletStore } from '../store/wallet'
import type { Currency } from '@/types'

export default function Withdraw() {
  const withdraw = useWalletStore(s => s.withdrawFunds)
  const [bank, setBank] = useState('')
  const [acc, setAcc] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<Currency>('INR')

  const submit = () => {
    if (!bank || !acc || !ifsc) return alert('Fill all bank details.')
    if (amount <= 0) return alert('Enter a valid amount.')
    withdraw(Number(amount), currency)
    alert('Withdrawal requested. (Dummy)')
    setBank(''); setAcc(''); setIfsc(''); setAmount(0)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-5">
        <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
        <div className="space-y-3">
          <div>
            <label className="label">Bank Name</label>
            <input className="input" value={bank} onChange={e => setBank(e.target.value)} />
          </div>
          <div>
            <label className="label">Account Number</label>
            <input className="input" value={acc} onChange={e => setAcc(e.target.value)} />
          </div>
          <div>
            <label className="label">IFSC Code</label>
            <input className="input" value={ifsc} onChange={e => setIfsc(e.target.value)} />
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
          <div>
            <label className="label">Amount</label>
            <input className="input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
          </div>
          <div className="pt-2">
            <button className="btn btn-primary" onClick={submit}>Submit Withdrawal</button>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-lg font-semibold mb-4">Notes</h3>
        <ul className="list-disc ml-5 text-sm text-gray-600 space-y-2">
          <li>This is a dummy form. No real bank action occurs.</li>
          <li>On submit, amount is deducted from the selected currency balance and a transaction is recorded.</li>
          <li>If balance is insufficient, the transaction is marked as FAILED.</li>
        </ul>
      </div>
    </div>
  )
}