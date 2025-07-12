import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-700">ReWear</Link>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add">Add Item</Link>
            <button onClick={logout} className="text-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
