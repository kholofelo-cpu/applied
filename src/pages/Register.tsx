import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, Link } from "react-router"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { register } = useAuth()
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
      <button type="submit">Register</button>
      <br>
      </br>
      <Link to="/login">Have account? Login</Link>
    </form>
  )
}