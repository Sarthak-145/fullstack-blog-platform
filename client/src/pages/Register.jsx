import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(false);
  //email, username, password
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      seterror("Passowrd don't match");
      return;
    }
    setLoading(true);
    seterror(null);

    try {
      await register({ email, username, password });
      navigate('/home');
    } catch (err) {
      seterror(err.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1324] to-[#020617] px-4">
      <div
        className="w-full max-w-md rounded-xl bg-[#020617]/80 backdrop-blur
                   border border-cyan-400/20 shadow-[0_0_40px_rgba(0,255,255,0.08)]
                   p-8"
      >
        <h2 className="text-center text-2xl font-semibold tracking-wide text-cyan-400 mb-8">
          Create your account
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Username</label>
            <input
              type="text"
              placeholder="Your name"
              className="rounded-md bg-transparent border border-cyan-400/40
                         px-4 py-2 text-slate-100 placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/60
                         focus:border-cyan-400 transition"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Email</label>
            <input
              type="email"
              placeholder="abc@example.com"
              className="rounded-md bg-transparent border border-cyan-400/40
                         px-4 py-2 text-slate-100 placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/60
                         focus:border-cyan-400 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Password</label>
            <input
              type="password"
              className="rounded-md bg-transparent border border-cyan-400/40
                         px-4 py-2 text-slate-100 placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/60
                         focus:border-cyan-400 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-200">Confirm Password</label>
            <input
              type="password"
              className="rounded-md bg-transparent border border-cyan-400/40
                         px-4 py-2 text-slate-100 placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/60
                         focus:border-cyan-400 transition"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="mt-4 rounded-md bg-cyan-400 text-[#020617]
                       py-2 font-medium tracking-wide
                       hover:bg-cyan-300 active:scale-[0.98]
                       transition"
            disabled={loading}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
