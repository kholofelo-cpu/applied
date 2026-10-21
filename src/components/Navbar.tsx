import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-zinc-900 text-white flex justify-between p-4 bg-zinc border-b">
      <Link to="/" className="font-bold">Track Your Applications</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button onClick={handleLogout} className="bg-green text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;