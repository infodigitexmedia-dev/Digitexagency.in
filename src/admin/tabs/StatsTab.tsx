import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { Save, AlertTriangle, Eye, EyeOff, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const StatsTab: React.FC = () => {
  const { data, updateStatistics } = useWebsite();
  const { statistics } = data;

  const [showPublicly, setShowPublicly] = useState(statistics.showPublicly);
  const [items, setItems] = useState([...statistics.items]);

  const handleItemChange = (index: number, field: string, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: 'stat-' + Date.now(),
        label: 'Metric Label',
        value: '10+',
        verifiedNote: 'Verified internal milestone',
      },
    ]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatistics({
      showPublicly,
      items,
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Statistics & Verified Metrics</h2>
          <p className="text-xs text-gray-500">
            Control the optional statistics section.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Strict Authenticity Policy Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-900">
            DIGITEX Authentic Representation Policy
          </h4>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Per company guidelines, generic design numbers (such as arbitrary 150+ Projects, 40+ Brands, or 98% Satisfaction) are never published without verification. Keep this section disabled until you have exact operational figures you wish to display.
          </p>
        </div>
      </div>

      {/* Toggle Public Display */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#111111]">
            Public Visibility of Statistics
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {showPublicly
              ? 'Status: Currently VISIBLE on public homepage.'
              : 'Status: Currently HIDDEN from public website (Safe default).'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPublicly(!showPublicly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs transition-colors border ${
            showPublicly
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
          }`}
        >
          {showPublicly ? (
            <>
              <Eye className="w-4 h-4" />
              <span>Visible on Website</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hidden from Website</span>
            </>
          )}
        </button>
      </div>

      {/* Metrics List */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
            Metric Cards ({items.length})
          </h3>

          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-semibold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Metric</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Metric Value
                </label>
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                  placeholder="24"
                  className="w-full px-3 py-1.5 text-xs font-bold font-mono border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleItemChange(index, 'label', e.target.value)}
                  placeholder="Active Client Retainers"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">
                  Verification Basis / Note
                </label>
                <input
                  type="text"
                  value={item.verifiedNote || ''}
                  onChange={(e) => handleItemChange(index, 'verifiedNote', e.target.value)}
                  placeholder="Verified active agency contracts"
                  className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                  title="Remove metric"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
