import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid email or password";
      setErrors({ general: message });
    }
  };

  return (
    // OUTSIDE NOW ZINC
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      {/* INSIDE NOW WHITE */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-zinc-200 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>
        
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-500 rounded-lg text-sm text-red-600">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="text-sm text-zinc-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validate}
              placeholder="you@example.com"
              className={`w-full mt-1 p-3 rounded-lg bg-zinc-100 border ${errors.email ? 'border-red-500' : 'border-zinc-300'} outline-none text-black placeholder:text-zinc-400`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm text-zinc-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validate}
              placeholder="Your password"
              className={`w-full mt-1 p-3 rounded-lg bg-zinc-100 border ${errors.password ? 'border-red-500' : 'border-zinc-300'} outline-none text-black placeholder:text-zinc-400`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            <p className="text-[11px] text-zinc-500 mt-1">Tip: Password should have at least 8 chars, upper + lower + number.</p>
          </div>

          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-zinc-800 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-6">
          No account? <Link to="/register" className="text-black font-semibold hover:underline">Register</Link>
        </p>
         <Link to="/" className="text-sm underline">
        ← Home
      </Link>
      </div>
    </div>
  );
};

export default Login;