import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../api/client'

export default function ForgotPassword() {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await client.post('/auth/forgot-password', { email })
      setSuccess('OTP sent to your email!')
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await client.post('/auth/reset-password', { email, otp, new_password: newPassword })
      setSuccess('Password reset successful! Redirecting to login...')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.response?.data?.detail || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sma-auth-layout">
      <div className="sma-auth-card">
        <h2 className="sma-auth-title">Reset Password</h2>
        <p className="sma-auth-subtitle">
          {step === 1 ? 'Enter your email to receive an OTP' : 'Enter the OTP and your new password'}
        </p>

        {error && <div className="sma-alert sma-alert-error">{error}</div>}
        {success && <div className="sma-alert sma-alert-success">{success}</div>}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="sma-form">
            <div className="sma-form-group">
              <label className="sma-label">Email Address</label>
              <input
                type="email"
                className="sma-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            <button
              type="submit"
              className="sma-btn sma-btn-primary sma-btn-full"
              disabled={loading || !email}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="sma-form">
            <div className="sma-form-group">
              <label className="sma-label">OTP</label>
              <input
                type="text"
                className="sma-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>
            <div className="sma-form-group">
              <label className="sma-label">New Password</label>
              <input
                type="password"
                className="sma-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <button
              type="submit"
              className="sma-btn sma-btn-primary sma-btn-full"
              disabled={loading || !otp || !newPassword}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p className="sma-auth-switch">
          Remembered?{' '}
          <Link to="/login" className="sma-auth-switch-btn">Back to Login</Link>
        </p>
      </div>
    </div>
  )
}
