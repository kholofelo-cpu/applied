import { useState } from "react"
import { useNavigate, Link } from "react-router"
import Loader from "@/components/ui/loader"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { register, authLoading } = useAuth()
  const navigate = useNavigate()
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <br>
      </br>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <br></br>
      <button 
         type="submit" 
         disabled={authLoading}
         className="flex items-center justify-center gap-2 w-full bg-black text-white px-4 py-2 rounded disabled:opacity-50">

          {authLoading ? (
            <>
              <Loader /> Registering...

            </>
          ) : ( 
            "Register"
          )}
      </button>
      <br>
      </br>
      <Link to="/login">Have account? Login</Link>
    </form>
  )
}