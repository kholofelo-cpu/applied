import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, Link } from "react-router"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <br></br>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <br></br>
      <button type="submit">Login</button>
      <br></br>
      <Link to="/register">No account? Register</Link>
    </form>
  )
}