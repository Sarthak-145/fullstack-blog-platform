import { Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  return (
    <>
      <div className="flex items-center justify-center bg-surface text-white py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Write your posts</h1>

          <p className="text-gray-400">Turn thoughts into something real.</p>

          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Get started
          </Link>
        </div>
      </div>
      <Home />
    </>
  );
}
