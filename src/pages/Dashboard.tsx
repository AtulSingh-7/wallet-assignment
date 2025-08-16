import { useState } from 'react'
import { useWalletStore } from '../store/wallet'
import { RATES, format as fmt, convert } from '../utils/currency'
import TransactionTable from '../components/TransactionTable'
import AddFundsModal from '../components/AddFundsModal'
import ExchangeModal from '../components/ExchangeModal'

export default function Dashboard() {
  const { balances, recent } = useWalletStore()
  const [showAdd, setShowAdd] = useState(false)
  const [showExchange, setShowExchange] = useState(false)

  const totalINR =
    balances.INR +
    balances.USD / RATES.USD +
    balances.EUR / RATES.EUR +
    balances.GBP / RATES.GBP

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(['INR', 'USD', 'EUR', 'GBP'] as const).map(c => (
          <div key={c} className="card p-5">
            <div className="text-gray-600 text-sm">{c} Balance</div>
            <div className="text-2xl font-semibold mt-1">{fmt(balances[c], c)}</div>
            <div className="text-xs text-gray-500 mt-1">In INR: ₹{convert(balances[c], c, 'INR').toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="text-lg font-semibold mr-auto">Total (INR): ₹{totalINR.toFixed(2)}</div>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>Add Funds</button>
          <button className="btn" onClick={() => setShowExchange(true)}>Exchange Currency</button>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recent Transactions</h3>
          <TransactionTable rows={recent()} />
        </div>
      </div>

      {showAdd && <AddFundsModal onClose={() => setShowAdd(false)} />}
      {showExchange && <ExchangeModal onClose={() => setShowExchange(false)} />}
    </div>
  )
}