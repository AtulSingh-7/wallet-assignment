import { useMemo, useState } from 'react'
import { useWalletStore } from '../store/wallet'
import type { TxType, TxStatus } from '../types'
import TransactionTable from '../components/TransactionTable'
import { exportCSV, exportExcel, exportPDF } from '../utils/export'

export default function Transactions() {
  const { transactions } = useWalletStore()
  const [type, setType] = useState<'' | TxType>('')
  const [status, setStatus] = useState<'' | TxStatus>('')
  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const okType = type ? t.type === type : true
      const okStatus = status ? t.status === status : true
      const time = new Date(t.date).getTime()
      const okFrom = from ? time >= new Date(from).getTime() : true
      const okTo = to ? time <= new Date(to).getTime() : true
      return okType && okStatus && okFrom && okTo
    })
  }, [transactions, type, status, from, to])

  const exportRows = filtered.map(t => ({
    Date: new Date(t.date).toISOString(),
    Type: t.type,
    Status: t.status,
    Amount: t.amount,
    Currency: t.currency,
    Details: t.type === 'EXCHANGE' && t.toCurrency ? `→ ${t.toCurrency} ${t.toAmount?.toFixed(2)}` : (t.notes ?? '')
  }))

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h3 className="font-semibold mb-3">Filters</h3>
        <div className="grid md:grid-cols-5 gap-3">
          <div>
            <label className="label">Type</label>
            <select className="input" value={type} onChange={e => setType(e.target.value as any)}>
              <option value="">All</option>
              <option value="ADD">ADD</option>
              <option value="WITHDRAW">WITHDRAW</option>
              <option value="EXCHANGE">EXCHANGE</option>
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={status} onChange={e => setStatus(e.target.value as any)}>
              <option value="">All</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="FAILED">FAILED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
          <div>
            <label className="label">From</label>
            <input type="date" className="input" value={from} onChange={e => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="label">To</label>
            <input type="date" className="input" value={to} onChange={e => setTo(e.target.value)} />
          </div>
          <div className="flex items-end gap-2">
            <button className="btn" onClick={() => { setType(''); setStatus(''); setFrom(''); setTo(''); }}>Reset</button>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h3 className="font-semibold mr-auto">Transactions</h3>
          <button className="btn" onClick={() => exportCSV(exportRows)}>Export CSV</button>
          <button className="btn" onClick={() => exportExcel(exportRows)}>Export Excel</button>
          <button className="btn" onClick={() => exportPDF(exportRows)}>Export PDF</button>
        </div>
        <TransactionTable rows={filtered} />
      </div>
    </div>
  )
}