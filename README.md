
# Wallet Assignment (React + TS + Tailwind + Zustand)

A fully client-side wallet app that meets the assignment requirements.

## Tech Stack
- React (functional components & hooks)
- TypeScript
- Tailwind CSS
- Zustand (state & LocalStorage persistence)
- Vite (build tool)
- XLSX (Excel/CSV export), jsPDF (PDF export)
- React Router (routing)

## Features
- Login via mobile + OTP (fixed OTP: **1234**)
- Default INR balance: **₹1000**; multi-currency balances (USD/EUR/GBP start at 0)
- Add funds to any currency
- Withdraw funds with a dummy bank form (Bank/Account/IFSC)
- Exchange currency with fixed rates:
  - INR=1, USD=0.012, EUR=0.011, GBP=0.009
- Transactions page with filtering by type/status/date range
- Export transactions to CSV, Excel, or PDF
- Recent 5 transactions on Dashboard
- Data persisted in LocalStorage

## Getting Started
```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build && npm run preview
```

## Folder Structure
```
src/
  components/
  pages/
  store/
  utils/
```

## Assumptions
- Balances are tracked per currency. INR starts with 1000; others start at 0.
- Exchange uses fixed rates and is instantaneous.
- Withdraw is a dummy action; failure recorded if insufficient funds.
- Exports include currently filtered transactions.
- No backend; everything stays in the browser.
