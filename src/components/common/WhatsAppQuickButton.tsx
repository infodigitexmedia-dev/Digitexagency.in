import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const WhatsAppQuickButton: React.FC = () => {
  const { contactConfig } = useData();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="bg-[#0B0C0E] text-white text-xs py-2 px-3 rounded-md shadow-xl border border-neutral-700 flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-150">
          <span>Need rapid assistance? Chat on WhatsApp</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={contactConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        title="Chat with DIGITEX on WhatsApp (+91 9034242154)"
        id="floating-whatsapp-btn"
      >
        <MessageSquare className="w-7 h-7 fill-white text-white group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
