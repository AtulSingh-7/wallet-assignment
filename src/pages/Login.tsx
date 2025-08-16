import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWalletStore } from '../store/wallet'

export default function Login() {
  const [step, setStep] = useState<1 | 2>(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const login = useWalletStore(s => s.login)

  const validatePhone = (p: string) => /^\d{10}$/.test(p)

  const submitPhone = () => {
    if (!validatePhone(phone)) return alert('Enter a valid 10-digit mobile number')
    setStep(2)
  }

  const submitOtp = () => {
    if (otp === '1234') {
      login(phone)
      navigate('/app')
    } else {
      alert('Invalid OTP. Try 1234.')
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-gray-50">
      <div className="card max-w-md w-full p-6">
        <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
        <p className="text-gray-600 mb-6">Login with your mobile number and OTP (use 1234).</p>

        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="label">Mobile Number</label>
              <input className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., 9876543210" />
            </div>
            <button className="btn btn-primary w-full" onClick={submitPhone}>Send OTP</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div>
              <label className="label">Enter OTP (1234)</label>
              <input className="input" value={otp} onChange={e => setOtp(e.target.value)} placeholder="1234" />
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary flex-1" onClick={submitOtp}>Verify & Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}