import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { Save, RefreshCw } from 'lucide-react';

export const ContentTab: React.FC = () => {
  const { data, updateContent } = useWebsite();
  const [formData, setFormData] = useState({ ...data.content });
  const [strengthsText, setStrengthsText] = useState(
    data.content.aboutStrengths.join('\n')
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const strengthsArray = strengthsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    updateContent({
      ...formData,
      aboutStrengths: strengthsArray,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Website Copywriting & Headings</h2>
          <p className="text-xs text-gray-500">
            Edit all core messaging, headings, and CTAs across the agency website.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>

      {/* 1. Hero Section */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100">
          Hero Section Copy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Top Badge Text
            </label>
            <input
              type="text"
              name="heroBadge"
              value={formData.heroBadge}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Primary CTA Button
            </label>
            <input
              type="text"
              name="heroPrimaryCta"
              value={formData.heroPrimaryCta}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Secondary CTA Button
            </label>
            <input
              type="text"
              name="heroSecondaryCta"
              value={formData.heroSecondaryCta}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">
            Hero Headline *
          </label>
          <input
            type="text"
            required
            name="heroHeadline"
            value={formData.heroHeadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black font-semibold text-sm"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">
            Hero Supporting Description *
          </label>
          <textarea
            rows={3}
            required
            name="heroDescription"
            value={formData.heroDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* 2. Section Headings */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100">
          Section Headings & Subheadings
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Services Heading
            </label>
            <input
              type="text"
              name="servicesHeading"
              value={formData.servicesHeading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Services Subheading
            </label>
            <input
              type="text"
              name="servicesSubheading"
              value={formData.servicesSubheading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Projects Heading
            </label>
            <input
              type="text"
              name="projectsHeading"
              value={formData.projectsHeading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Projects Subheading
            </label>
            <input
              type="text"
              name="projectsSubheading"
              value={formData.projectsSubheading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Contact Heading
            </label>
            <input
              type="text"
              name="contactHeading"
              value={formData.contactHeading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              Contact Subheading
            </label>
            <input
              type="text"
              name="contactSubheading"
              value={formData.contactSubheading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* 3. About Section */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100">
          Why Choose DIGITEX (About Section)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              About Heading
            </label>
            <input
              type="text"
              name="aboutHeading"
              value={formData.aboutHeading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">
              About Subheading
            </label>
            <input
              type="text"
              name="aboutSubheading"
              value={formData.aboutSubheading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">
            About Main Narrative
          </label>
          <textarea
            rows={3}
            name="aboutDescription"
            value={formData.aboutDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">
            Strengths List (One per line)
          </label>
          <textarea
            rows={6}
            value={strengthsText}
            onChange={(e) => setStrengthsText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-xs"
          />
          <p className="text-[10px] text-gray-400 mt-1">
            Each line will render as a distinct strength item on the About section.
          </p>
        </div>
      </div>

      {/* 4. Footer Copy */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-gray-100">
          Footer Description
        </h3>

        <div>
          <label className="block font-bold text-gray-700 uppercase mb-1">
            Short Footer Summary
          </label>
          <textarea
            rows={2}
            name="footerDescription"
            value={formData.footerDescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>
    </form>
  );
};
