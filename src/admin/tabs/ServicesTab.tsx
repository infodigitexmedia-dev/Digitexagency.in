import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { ServiceItem } from '../../types';
import { ServiceIcon, AVAILABLE_ICON_NAMES } from '../../components/ServiceIcon';
import { Edit2, Trash2, Plus, Eye, EyeOff, Check, X } from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const { data, updateService, addService, deleteService } = useWebsite();
  const { services } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    iconName: 'Globe',
    isVisible: true,
  });

  const handleStartEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setIsAdding(false);
    setFormData({
      name: service.name,
      description: service.description,
      iconName: service.iconName,
      isVisible: service.isVisible,
    });
  };

  const handleSaveEdit = (id: string) => {
    updateService(id, {
      name: formData.name,
      description: formData.description,
      iconName: formData.iconName,
      isVisible: formData.isVisible,
    });
    setEditingId(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addService({
      name: formData.name,
      description: formData.description,
      iconName: formData.iconName,
      isVisible: formData.isVisible,
    });
    setIsAdding(false);
    setFormData({
      name: '',
      description: '',
      iconName: 'Globe',
      isVisible: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Services & Capabilities</h2>
          <p className="text-xs text-gray-500">
            Control the services displayed on the public website.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingId(null);
              setFormData({
                name: '',
                description: '',
                iconName: 'Target',
                isVisible: true,
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        )}
      </div>

      {/* Add New Service Form */}
      {isAdding && (
        <form onSubmit={handleCreate} className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-[#111111]">Add New Service</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Service Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Conversion Rate Optimization"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Icon
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                >
                  {AVAILABLE_ICON_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <div className="w-9 h-9 rounded bg-[#F7F7F7] border border-gray-300 flex items-center justify-center text-[#E51B23]">
                  <ServiceIcon name={formData.iconName} className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Short Description *
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Clear, objective description of what this service delivers..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-[#E51B23] hover:bg-[#c9141b] rounded font-semibold"
            >
              Save Service
            </button>
          </div>
        </form>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const isCurrentEditing = editingId === service.id;

          if (isCurrentEditing) {
            return (
              <div key={service.id} className="p-5 bg-white rounded-lg border-2 border-[#111111] space-y-3 text-xs">
                <div className="font-bold text-gray-700 uppercase mb-1">Editing Service</div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Icon</label>
                    <select
                      value={formData.iconName}
                      onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded"
                    >
                      {AVAILABLE_ICON_NAMES.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Visibility</label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isVisible: !formData.isVisible })}
                      className={`w-full py-1.5 px-2 rounded font-semibold text-center border ${
                        formData.isVisible
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-gray-100 text-gray-600 border-gray-300'
                      }`}
                    >
                      {formData.isVisible ? 'Visible' : 'Hidden'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveEdit(service.id)}
                    className="px-4 py-1.5 bg-[#111111] text-white rounded font-semibold"
                  >
                    Update
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={service.id}
              className={`p-5 rounded-lg border bg-white flex flex-col justify-between transition-colors ${
                service.isVisible ? 'border-gray-200 shadow-xs' : 'border-dashed border-gray-300 bg-gray-50 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[#E51B23]">
                    <ServiceIcon name={service.iconName} className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateService(service.id, { isVisible: !service.isVisible })}
                      className="p-1.5 text-gray-400 hover:text-black rounded"
                      title={service.isVisible ? 'Hide service' : 'Show service'}
                    >
                      {service.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleStartEdit(service)}
                      className="p-1.5 text-gray-400 hover:text-black rounded"
                      title="Edit service"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete service "${service.name}"?`)) {
                          deleteService(service.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                      title="Delete service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-[#111111] mb-1">
                  {service.name}
                  {!service.isVisible && (
                    <span className="ml-2 text-[10px] text-gray-400 font-normal">(Hidden)</span>
                  )}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Icon identifier: {service.iconName}</span>
                <span className="font-mono">Order #{service.order}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
