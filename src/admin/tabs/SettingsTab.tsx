import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { KeyRound, Download, Upload, RotateCcw, LogOut, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const {
    changeAdminPin,
    exportDataAsJSON,
    importDataFromJSON,
    resetToDefaults,
    logoutAdmin,
    showToast,
  } = useWebsite();

  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinMessage, setPinMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [isChangingPasskey, setIsChangingPasskey] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinMessage(null);

    if (newPin !== confirmPin) {
      setPinMessage({ type: 'error', text: 'New passcodes do not match.' });
      return;
    }

    if (newPin.length < 6) {
      setPinMessage({ type: 'error', text: 'Passcode must be at least 6 characters.' });
      return;
    }

    setIsChangingPasskey(true);
    try {
      const success = await changeAdminPin(oldPin, newPin);
      if (success) {
        setPinMessage({ type: 'success', text: 'Administrative passkey updated successfully.' });
        setOldPin('');
        setNewPin('');
        setConfirmPin('');
      } else {
        setPinMessage({ type: 'error', text: 'Current passkey is incorrect.' });
      }
    } catch {
      setPinMessage({ type: 'error', text: 'Failed to update passkey. Please try again.' });
    } finally {
      setIsChangingPasskey(false);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataFromJSON(content);
        if (!success) {
          showToast('Invalid backup file format.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 text-xs max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[#111111]">Dashboard & Security Settings</h2>
        <p className="text-xs text-gray-500">
          Manage administrative authentication, backups, and data persistence.
        </p>
      </div>

      {/* 1. Change Passcode */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <KeyRound className="w-4 h-4 text-[#E51B23]" />
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
            Owner Passcode Security
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Current Passcode
            </label>
            <input
              type="password"
              required
              value={oldPin}
              onChange={(e) => setOldPin(e.target.value)}
              placeholder="Enter current passkey"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              New Passcode
            </label>
            <input
              type="password"
              required
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="Enter new secure passkey"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Confirm New Passcode
            </label>
            <input
              type="password"
              required
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="Re-enter new passkey"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          {pinMessage && (
            <div
              className={`p-2.5 rounded text-xs border ${
                pinMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {pinMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isChangingPasskey}
            className="px-4 py-2 bg-[#111111] hover:bg-black disabled:bg-gray-400 text-white rounded font-semibold transition-colors"
          >
            {isChangingPasskey ? 'Updating...' : 'Update Passcode'}
          </button>
        </form>
      </div>

      {/* 2. Backup & Export */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <Download className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
            Backup & Data Portability
          </h3>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Export a complete JSON backup of all projects, services, testimonials, gallery media, and contact details. You can import this backup on any device or store it offline.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={exportDataAsJSON}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
          >
            <Download className="w-4 h-4 text-[#E51B23]" />
            <span>Download Backup (JSON)</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Restore from Backup (JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 3. Reset Defaults & Logout */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
            System Operations
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div>
            <h4 className="text-xs font-bold text-[#111111]">Reset Agency Defaults</h4>
            <p className="text-[11px] text-gray-500">
              Restore the original DIGITEX agency content, projects, and initial services.
            </p>
          </div>
          <button
            type="button"
            onClick={resetToDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Content</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            <h4 className="text-xs font-bold text-[#111111]">Sign Out of Dashboard</h4>
            <p className="text-[11px] text-gray-500">
              Close administrative session. Requires passcode to re-enter.
            </p>
          </div>
          <button
            type="button"
            onClick={logoutAdmin}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-black hover:bg-gray-800 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-[#E51B23]" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
