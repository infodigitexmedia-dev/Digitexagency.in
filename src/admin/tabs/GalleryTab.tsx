import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';

export const GalleryTab: React.FC = () => {
  const { data, addGalleryItem, deleteGalleryItem, toggleGalleryVisibility } = useWebsite();
  const { gallery } = data;

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Agency',
    imageUrl: '',
    isVisible: true,
  });

  const categories = ['Agency', 'Process', 'Design', 'Development', 'Events'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl.trim() || !formData.title.trim()) return;

    addGalleryItem({
      title: formData.title,
      category: formData.category,
      imageUrl: formData.imageUrl,
      isVisible: formData.isVisible,
    });

    setIsAdding(false);
    setFormData({
      title: '',
      category: 'Agency',
      imageUrl: '',
      isVisible: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Media & Brand Gallery</h2>
          <p className="text-xs text-gray-500">
            Manage authentic visual assets, studio sessions, and design deliverables.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Asset</span>
          </button>
        )}
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-[#111111]">Add Media Asset</h3>
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
                Asset Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Design Studio Sprint Session"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Image URL *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded border border-gray-300"
                />
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Use real studio photography, design mockups, or workspace photography.
            </p>
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
              Add to Gallery
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg border overflow-hidden flex flex-col justify-between ${
              item.isVisible ? 'border-gray-200 shadow-xs' : 'border-dashed border-gray-300 opacity-60'
            }`}
          >
            <div className="aspect-[4/3] bg-gray-100 relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase bg-white/90 rounded text-[#111111]">
                {item.category}
              </span>
            </div>

            <div className="p-3">
              <h4 className="text-xs font-bold text-[#111111] truncate mb-2">{item.title}</h4>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="text-[10px] text-gray-400">{item.uploadedAt}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleGalleryVisibility(item.id)}
                    className="p-1 text-gray-400 hover:text-black rounded"
                    title={item.isVisible ? 'Hide' : 'Show'}
                  >
                    {item.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => deleteGalleryItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
