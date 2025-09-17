import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import SkipToMain from './components/ui/SkipToMain'

// Pages
import Home from './pages/Home'
import Details from './pages/Details'
import Register from './pages/Register'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import NotFound from './pages/NotFound'

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAuthRoute = location.pathname.startsWith('/auth') || location.pathname === '/dashboard'

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-950 text-gray-50">
        {/* Skip to main content link for accessibility */}
        <SkipToMain />

        {/* Scroll to top on route change */}
        <ScrollToTop />

        {/* Navigation - hide on admin routes */}
        {!isAdminRoute && !isAuthRoute && <Navbar />}

        {/* Main content with page transitions */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />

            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>

        {/* Footer - hide on admin routes */}
        {!isAdminRoute && !isAuthRoute && <Footer />}
      </div>
    </AuthProvider>
  )
}

export default App