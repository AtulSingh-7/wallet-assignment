import type { Transaction, TxType, TxStatus } from '@/types'
import { format } from 'date-fns'

interface Props {
  rows: Transaction[]
}

const TypeBadge: React.FC<{ t: TxType }> = ({ t }) => {
  const cls = t === 'ADD' ? 'bg-green-100 text-green-700' : t === 'WITHDRAW' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
  return <span className={`px-2 py-1 rounded-lg text-xs ${cls}`}>{t}</span>
}

const StatusBadge: React.FC<{ s: TxStatus }> = ({ s }) => {
  const cls = s === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : s === 'FAILED' ? 'bg-rose-100 text-rose-700' : 'bg-yellow-100 text-yellow-700'
  return <span className={`px-2 py-1 rounded-lg text-xs ${cls}`}>{s}</span>
}

export default function TransactionTable({ rows }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-xl">
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Currency</th>
            <th className="p-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-3 whitespace-nowrap">{format(new Date(r.date), 'yyyy-MM-dd HH:mm')}</td>
              <td className="p-3"><TypeBadge t={r.type} /></td>
              <td className="p-3"><StatusBadge s={r.status} /></td>
              <td className="p-3">{r.amount.toFixed(2)}</td>
              <td className="p-3">{r.currency}</td>
              <td className="p-3 text-gray-600">
                {r.type === 'EXCHANGE' && r.toCurrency ? `→ ${r.toCurrency} ${r.toAmount?.toFixed(2)}` : (r.notes ?? '')}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td className="p-6 text-center text-gray-500" colSpan={6}>No transactions yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}