import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOwnerAuth } from '../../context/OwnerAuthContext';
import { DigitexSymbol } from '../common/DigitexLogo';

export const OwnerProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useOwnerAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070B12] flex flex-col items-center justify-center text-white select-none">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <DigitexSymbol size={28} theme="light-on-dark" />
          </div>
        </div>
        <h2 className="text-sm font-black tracking-widest text-slate-200 uppercase">
          Verifying Owner Authorization...
        </h2>
        <p className="text-xs text-slate-500 mt-1">Connecting to DIGITEX Security Gateway</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/owner/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
