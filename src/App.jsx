import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ForgotPassword from './components/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoutes'
import AdminRoute from './components/AdminRoute'
import StudentList from './components/StudentList'
import AddStudentPage from './components/AddStudentPage'
import EditStudentPage from './components/EditStudentPage'
import AiChatPage from './components/AiChatPage'
import './App.css'

export default function App() {
  return (
    <div className="sma-app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/students" element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        } />
        
        <Route path="/students/new" element={
          <AdminRoute>
            <AddStudentPage />
          </AdminRoute>
        } />
        
        <Route path="/students/:id/edit" element={
          <AdminRoute>
            <EditStudentPage />
          </AdminRoute>
        } />
        
        <Route path="/ai" element={
          <ProtectedRoute>
            <AiChatPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}