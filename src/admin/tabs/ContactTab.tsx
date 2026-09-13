import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { Save, MessageSquare, Mail, MapPin, Globe } from 'lucide-react';

export const ContactTab: React.FC = () => {
  const { data, updateContact } = useWebsite();
  const [formData, setFormData] = useState({ ...data.contact });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Contact & Inquiries Setup</h2>
          <p className="text-xs text-gray-500">
            Configure direct agency communication channels, WhatsApp routing, and office details.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>WhatsApp & Phone Channels</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              WhatsApp Number (with country code) *
            </label>
            <input
              type="text"
              name="whatsappNumber"
              required
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="9034242154"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black font-mono"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Used for WhatsApp routing and mobile dialer links.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Display Phone Number
            </label>
            <input
              type="text"
              name="displayPhone"
              value={formData.displayPhone}
              onChange={handleChange}
              placeholder="9034242154"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100 flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-600" />
          <span>Email & Operating Schedule</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Agency Contact Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="info.digitex.media@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Business Hours / Support Window
            </label>
            <input
              type="text"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
              placeholder="Monday – Friday, 9:30 AM – 6:30 PM IST"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-600" />
          <span>Office Address & Location</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Street / Building Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Commercial Tower, Cyber Hub Road"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              City / State / Country
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Pune / Mumbai, India"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-purple-600" />
          <span>Social Media Profiles</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Instagram Profile URL (Official)
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={formData.instagramUrl}
              onChange={handleChange}
              placeholder="https://www.instagram.com/digitexagency.in?stkn=MTY3cmxudzJ3dXEydA=="
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Twitter / X Profile URL
            </label>
            <input
              type="url"
              name="twitterUrl"
              value={formData.twitterUrl}
              onChange={handleChange}
              placeholder="https://x.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Facebook Profile URL
            </label>
            <input
              type="url"
              name="facebookUrl"
              value={formData.facebookUrl || ''}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl || ''}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
