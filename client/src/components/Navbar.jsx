import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-app text-white">
      <div className="text-xl bg-app font-bold tracking-tight">Qveboo</div>

      <div className="flex items-center">
        <Link to="/" className="mx-4 hover-text-accent">
          Home
        </Link>

        {!user && (
          <Link to="/login" className="mx-4 hover-text-accent">
            Login
          </Link>
        )}

        {user && (
          <Link to="/post/new" className="mx-4 hover-text-accent">
            Create Post
          </Link>
        )}

        <a href="mailto:qveboo@gmail.com" className="mx-4 hover-text-accent">
          Contact
        </a>

        {user && (
          <Link to="/dashboard" className="mx-4 hover-text-accent">
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
