import React, { useState } from 'react';
import { X, Lock, KeyRound, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, setIsAdminLoginModalOpen, loginAdmin } = useWebsite();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleClose = () => {
    setIsAdminLoginModalOpen(false);
    setError('');
    setPasscode('');
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await loginAdmin(passcode);
      if (!success) {
        setError('Invalid administrative passkey. Access denied.');
      }
    } catch {
      setError('Authentication failed. Please verify your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="admin-login-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs modal-backdrop-animate"
    >
      <div
        id="admin-login-dialog"
        className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden border border-gray-200 modal-dialog-animate"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#F7F7F7]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#111111] text-white flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#E51B23]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#111111] leading-tight">Owner Portal Access</h3>
              <p className="text-[11px] text-[#777777]">DIGITEX Agency CMS</p>
            </div>
          </div>
          <button
            id="close-admin-login-btn"
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-black rounded modal-close-btn"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-passkey-input"
                className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5"
              >
                Owner Passkey
              </label>
              <div className="relative">
                <input
                  id="admin-passkey-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter administrative passkey"
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all bg-white"
                />
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  id="toggle-password-visibility-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-0.5 text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Hide passkey' : 'Show passkey'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                id="admin-login-error"
                className="flex items-start gap-2 p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 animate-in fade-in duration-150"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-[#E51B23] mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            <div className="text-[11px] text-[#777777] leading-relaxed">
              Authorized access only. Management session will be preserved securely for this browser.
            </div>

            <button
              id="submit-admin-login-btn"
              type="submit"
              disabled={isSubmitting || !passcode.trim()}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#111111] hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed rounded shadow-xs flex items-center justify-center gap-2 btn-interactive"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Authenticate & Open Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
