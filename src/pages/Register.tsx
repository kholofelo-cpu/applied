import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string; password?: string; confirm?: string}>({});
  const [showGuide, setShowGuide] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const isPasswordValid = Object.values(passwordRules).every(Boolean);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address, e.g. name@example.com";
    }
    if (!isPasswordValid) {
      newErrors.password = "Password must meet all requirements below";
    }
    if (!confirmPassword) {
      newErrors.confirm = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirm = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(email, password);
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setErrors({ email: message });
    }
  };

  return (
    // OUTSIDE ZINC
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      {/* INSIDE WHITE */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-zinc-200 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Register</h1>
        
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
              onFocus={() => setShowGuide(true)}
              onBlur={validate}
              placeholder="Create a password"
              className={`w-full mt-1 p-3 rounded-lg bg-zinc-100 border ${errors.password ? 'border-red-500' : 'border-zinc-300'} outline-none text-black placeholder:text-zinc-400`}
            />
            {showGuide && (
              <div className="mt-2 p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs space-y-1">
                <p className="font-semibold text-zinc-700 mb-1">Password must have:</p>
                <p className={passwordRules.length ? "text-green-600" : "text-zinc-400"}>✓ At least 8 characters</p>
                <p className={passwordRules.upper ? "text-green-600" : "text-zinc-400"}>✓ One uppercase letter (A-Z)</p>
                <p className={passwordRules.lower ? "text-green-600" : "text-zinc-400"}>✓ One lowercase letter (a-z)</p>
                <p className={passwordRules.number ? "text-green-600" : "text-zinc-400"}>✓ One number (0-9)</p>
              </div>
            )}
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm text-zinc-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validate}
              placeholder="Confirm your password"
              className={`w-full mt-1 p-3 rounded-lg bg-zinc-100 border ${errors.confirm ? 'border-red-500' : 'border-zinc-300'} outline-none text-black placeholder:text-zinc-400`}
            />
            {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
          </div>

          <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-zinc-800 transition mt-2">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-6">
          Have account? <Link to="/login" className="text-black font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;