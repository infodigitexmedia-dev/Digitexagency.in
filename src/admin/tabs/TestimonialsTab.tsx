import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { TestimonialItem } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star } from 'lucide-react';

export const TestimonialsTab: React.FC = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useWebsite();
  const { testimonials } = data;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    role: '',
    avatarUrl: '',
    review: '',
    rating: 5,
    isVisible: true,
  });

  const handleOpenAdd = () => {
    setIsFormOpen(true);
    setEditingId(null);
    setFormData({
      clientName: '',
      company: '',
      role: '',
      avatarUrl: '',
      review: '',
      rating: 5,
      isVisible: true,
    });
  };

  const handleOpenEdit = (test: TestimonialItem) => {
    setIsFormOpen(true);
    setEditingId(test.id);
    setFormData({
      clientName: test.clientName,
      company: test.company,
      role: test.role || '',
      avatarUrl: test.avatarUrl || '',
      review: test.review,
      rating: test.rating,
      isVisible: test.isVisible,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTestimonial(editingId, {
        clientName: formData.clientName,
        company: formData.company,
        role: formData.role,
        avatarUrl: formData.avatarUrl,
        review: formData.review,
        rating: Number(formData.rating),
        isVisible: formData.isVisible,
      });
    } else {
      addTestimonial({
        clientName: formData.clientName,
        company: formData.company,
        role: formData.role,
        avatarUrl: formData.avatarUrl,
        review: formData.review,
        rating: Number(formData.rating),
        isVisible: formData.isVisible,
      });
    }
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Client Testimonials Management</h2>
          <p className="text-xs text-gray-500">
            Publish verified reviews and client quotes.
          </p>
        </div>

        {!isFormOpen && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {/* Testimonial Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-[#111111]">
              {editingId ? 'Edit Review' : 'Add New Client Review'}
            </h3>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="e.g. Vikram Malhotra"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Company / Organization *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Acme Tech Solutions"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Client Role (Optional)
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Managing Director"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Profile Avatar URL (Optional)
              </label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Rating (1 to 5 Stars)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              >
                <option value={5}>5 Stars (Exceptional)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Satisfactory)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Review Quotation *
            </label>
            <textarea
              rows={3}
              required
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              placeholder="What did the client state about their experience working with DIGITEX?"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="test-vis-check"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
              className="w-4 h-4 text-[#E51B23]"
            />
            <label htmlFor="test-vis-check" className="font-semibold text-gray-800">
              Visible on Public Website
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-[#E51B23] hover:bg-[#c9141b] rounded font-semibold"
            >
              Save Testimonial
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className={`p-5 bg-white rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              test.isVisible ? 'border-gray-200 shadow-xs' : 'border-dashed border-gray-300 bg-gray-50 opacity-75'
            }`}
          >
            <div className="flex items-start gap-4">
              {test.avatarUrl ? (
                <img
                  src={test.avatarUrl}
                  alt={test.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-[#111111] shrink-0">
                  {test.clientName.charAt(0)}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-[#111111]">{test.clientName}</span>
                  <span className="text-xs text-gray-500 font-medium">({test.company})</span>
                  {!test.isVisible && (
                    <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-[10px] rounded font-semibold">
                      Hidden
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs text-gray-600 italic max-w-xl">"{test.review}"</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => updateTestimonial(test.id, { isVisible: !test.isVisible })}
                className="p-1.5 text-gray-400 hover:text-black border border-gray-200 rounded"
                title={test.isVisible ? 'Hide from public site' : 'Show on public site'}
              >
                {test.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => handleOpenEdit(test)}
                className="p-1.5 text-gray-600 hover:text-black border border-gray-200 rounded"
                title="Edit review"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete review from ${test.clientName}?`)) {
                    deleteTestimonial(test.id);
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 border border-gray-200 rounded"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
