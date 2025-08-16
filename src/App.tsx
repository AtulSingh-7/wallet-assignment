import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useWalletStore } from './store/wallet'
import { LogOut, Wallet, History, ArrowDownToLine } from 'lucide-react'

export default function App() {
  const navigate = useNavigate()
  const { isAuthed, logout } = useWalletStore()

  if (!isAuthed) {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-bold">W</div>
            <span className="font-semibold">Wallet</span>
          </div>
          <nav className="ml-6 flex items-center gap-2 text-sm">
            <NavLink to="/app" className={({isActive}) => isActive ? 'px-3 py-1.5 rounded-lg bg-black text-white' : 'px-3 py-1.5 rounded-lg hover:bg-gray-100'}>
              <div className="flex items-center gap-2"><Wallet size={16}/> Dashboard</div>
            </NavLink>
            <NavLink to="/app/transactions" className={({isActive}) => isActive ? 'px-3 py-1.5 rounded-lg bg-black text-white' : 'px-3 py-1.5 rounded-lg hover:bg-gray-100'}>
              <div className="flex items-center gap-2"><History size={16}/> Transactions</div>
            </NavLink>
            <NavLink to="/app/withdraw" className={({isActive}) => isActive ? 'px-3 py-1.5 rounded-lg bg-black text-white' : 'px-3 py-1.5 rounded-lg hover:bg-gray-100'}>
              <div className="flex items-center gap-2"><ArrowDownToLine size={16}/> Withdraw</div>
            </NavLink>
          </nav>
          <div className="ml-auto">
            <button onClick={() => { logout(); navigate('/'); }} className="btn"> <LogOut className="mr-2" size={16}/> Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}