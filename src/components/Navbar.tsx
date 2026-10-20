// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import Loader from "./ui/loader"

export default function Navbar() {
  const { user, logout, authLoading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link to="/" className="font-bold text-lg">Applied</Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm opacity-70">{user.email}</span>
            <button 
              onClick={handleLogout} 
              disabled={authLoading}
              className="flex items-center gap-2"
            >
                  {authLoading ? <Loader /> : "Logout"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-white text-black px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}