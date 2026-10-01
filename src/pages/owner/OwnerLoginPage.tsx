import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useOwnerAuth } from '../../context/OwnerAuthContext';
import { DigitexLogo } from '../../components/common/DigitexLogo';

export const OwnerLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useOwnerAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/owner';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter your owner password.');
      return;
    }

    setSubmitting(true);
    const res = await login(password);
    setSubmitting(false);

    if (res.ok) {
      const from = (location.state as any)?.from?.pathname || '/owner';
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B12] py-12 px-4">
      <div className="max-w-md w-full bg-[#0B1220] border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-5">
            <DigitexLogo variant="dark" size="md" clickable={false} />
          </div>

          <div className="inline-block px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 rounded-full text-xs font-bold text-[#38BDF8] mb-3">
            OWNER PORTAL GATEWAY
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Owner Portal Authentication
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Administrative access for managing DIGITEX services, projects, media, and inquiries.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-950/70 border border-red-800 text-red-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
              Owner Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter owner password"
              className="w-full px-4 py-3 bg-[#0F172A] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base"
              disabled={submitting}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-[11px] text-slate-500">
                Encrypted bcrypt credential verification
              </span>
              <button
                type="button"
                id="toggle-password-visibility-btn"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 py-1 px-2.5 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            id="owner-login-submit-btn"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-60 cursor-pointer uppercase tracking-wider"
          >
            {submitting ? 'Authenticating...' : 'Enter Owner Portal'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
