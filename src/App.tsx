import { useEffect } from 'react'
import Home from './pages/Home'
import AdminApp from './admin/AdminApp'

function App() {
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

  useEffect(() => {
    if (isAdminRoute) return
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isAdminRoute])

  if (isAdminRoute) {
    return <AdminApp />
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-body">
      <Home />
    </div>
  )
}

export default App
