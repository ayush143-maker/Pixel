import { Loader2 } from 'lucide-react'
import { AuthProvider, useAuth } from './AuthContext'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

function AdminGate() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-text-secondary">
        <Loader2 className="animate-spin" size={24} />
      </div>
    )
  }

  return session ? <AdminDashboard /> : <AdminLogin />
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <div className="font-body text-text-primary">
        <AdminGate />
      </div>
    </AuthProvider>
  )
}
