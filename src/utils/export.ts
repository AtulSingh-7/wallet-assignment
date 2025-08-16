import { utils, writeFile } from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable' // type ignored if no types

// We won't import types to keep it simple
export function exportCSV(rows: any[], filename = 'transactions.csv') {
  const ws = utils.json_to_sheet(rows)
  const csv = utils.sheet_to_csv(ws)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportExcel(rows: any[], filename = 'transactions.xlsx') {
  const ws = utils.json_to_sheet(rows)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, ws, 'Transactions')
  writeFile(wb, filename)
}

export function exportPDF(rows: any[], filename = 'transactions.pdf') {
  const doc = new jsPDF()
  const headers = Object.keys(rows[0] ?? {})
  const data = rows.map(r => headers.map(h => String(r[h])))
  // @ts-ignore
  autoTable(doc, { head: [headers], body: data })
  doc.save(filename)
}