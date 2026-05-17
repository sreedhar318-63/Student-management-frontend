import { useNavigate } from 'react-router-dom'

export default function StudentCard({ student, onDelete }) {
  const { id, name, age, email, city = 'Unknown' } = student
  const navigate = useNavigate()

  return (
    <div className="sma-student-card">
      <div className="sma-card-top-section">
        <div className="sma-student-card-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {localStorage.getItem('role') === 'admin' && (
            <>
              <button
                className="sma-btn-icon sma-btn-icon-edit"
                style={{ width: 'auto', padding: '0 12px' }}
                onClick={() => navigate(`/students/${id}/edit`)}
                title="Edit student"
              >
                Edit
              </button>
              <button
                className="sma-btn-icon sma-btn-icon-delete"
                style={{ width: 'auto', padding: '0 12px' }}
                onClick={() => onDelete(id)}
                title="Delete student"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="sma-student-card-body">
        <h3 className="sma-student-card-name">{name}</h3>
        <p className="sma-student-card-detail">{email}</p>
        <div className="sma-student-card-footer">
          <span className="sma-student-card-age">Age {age}</span>
          <span className="sma-student-card-tag">{city}</span>
        </div>
      </div>
    </div>
  )
}

