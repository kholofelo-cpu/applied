import { Routes, Route, Navigate } from "react-router"
import Layout from "./components/Layout"
import { ApplicationsPage } from "./pages/ApplicationsPage"
import { ApplicationPage } from "./pages/ApplicationPage"
import { NewApplicationPage } from "./pages/NewApplicationPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useAuth } from "./hooks/useAuth"
import Navbar from './components/Navbar'
import { AuthProvider } from "./context/AuthContext"

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
   <AuthProvider>
    <Navbar />
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Protected><ApplicationsPage /></Protected>} />
          <Route path="/applications/:id" element={<Protected><ApplicationPage /></Protected>} />
          <Route path="/new" element={<Protected><NewApplicationPage /></Protected>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
   </AuthProvider>
  )
}