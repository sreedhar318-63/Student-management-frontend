import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="sma-landing">
      <div className="sma-landing-card">
        <div className="sma-landing-logo">◆</div>
        <h1 className="sma-landing-title">Student Management System</h1>
        <p className="sma-landing-subtitle">
          Keep track of your students with ease.
          Add, view, and manage student records all in one place.
        </p>

        <div style={{ textAlign: 'left', margin: '2rem 0', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>✨ Features</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li>👨‍🎓 <strong>Student Management:</strong> Add, edit, and delete student records (Admin only).</li>
            <li>🔒 <strong>Role-based Access:</strong> Secure system with Admin and regular User roles.</li>
            <li>🤖 <strong>AI Assistant:</strong> Built-in AI to help you manage and analyze data.</li>
            <li>📱 <strong>Responsive Design:</strong> Beautiful UI that works on any device.</li>
          </ul>
        </div>

        <div className="sma-landing-actions">
          <Link to="/login" className="sma-btn sma-btn-primary sma-btn-lg">
            Sign In
          </Link>
          <Link to="/register" className="sma-btn sma-btn-outline sma-btn-lg">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}