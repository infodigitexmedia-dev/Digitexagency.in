import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface WhatsAppFormProps {
  defaultService?: string;
  className?: string;
  title?: string;
  description?: string;
}

export const WhatsAppForm: React.FC<WhatsAppFormProps> = ({
  defaultService = '',
  className = '',
  title = 'Send an Instant Enquiry',
  description = 'Fill out the form below. We will generate your WhatsApp message and connect you directly with our technical team.',
}) => {
  const { submitEnquiry, services } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please provide your phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setError('Please describe your project or enquiry.');
      return;
    }

    // Submit enquiry into local context & generate WhatsApp URL
    const whatsappUrl = submitEnquiry({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      service: formData.service || 'General Tech Inquiry',
      message: formData.message.trim(),
    });

    setSubmitted(true);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bg-white border border-[#D1D5DB] rounded-xl p-6 sm:p-8 shadow-sm ${className}`} id="whatsapp-enquiry-form">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#25D366]/10 text-[#25D366] text-xs font-bold rounded-full mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct WhatsApp Consultation</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0C0E]">{title}</h3>
        <p className="text-sm text-[#4B5563] mt-1">{description}</p>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-[#0B0C0E]">Opening WhatsApp...</h4>
          <p className="text-sm text-[#4B5563] max-w-sm mx-auto">
            Your enquiry details have been generated. If WhatsApp did not open automatically, click the button below:
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', email: '', service: defaultService, message: '' });
              }}
              className="text-xs font-semibold text-[#E11D2E] hover:underline"
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-[#E11D2E] text-xs rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0C0E] mb-1">
              Your Name <span className="text-[#E11D2E]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Michael Vance"
              className="w-full px-3.5 py-2.5 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#0B0C0E] placeholder:text-neutral-400 focus:outline-none focus:border-[#0B0C0E] focus:ring-1 focus:ring-[#0B0C0E]"
              id="enquiry-input-name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0C0E] mb-1">
                Phone Number <span className="text-[#E11D2E]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#0B0C0E] placeholder:text-neutral-400 focus:outline-none focus:border-[#0B0C0E] focus:ring-1 focus:ring-[#0B0C0E]"
                id="enquiry-input-phone"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0C0E] mb-1">
                Email Address <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#0B0C0E] placeholder:text-neutral-400 focus:outline-none focus:border-[#0B0C0E] focus:ring-1 focus:ring-[#0B0C0E]"
                id="enquiry-input-email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0C0E] mb-1">
              Interested Service
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#0B0C0E] focus:outline-none focus:border-[#0B0C0E] focus:ring-1 focus:ring-[#0B0C0E]"
              id="enquiry-select-service"
            >
              <option value="">Select a service category...</option>
              {services.map((svc) => (
                <option key={svc.id} value={svc.title}>
                  {svc.title}
                </option>
              ))}
              <option value="Dedicated Hiring / Staff Augmentation">Dedicated Hiring / Staff Augmentation</option>
              <option value="General Enterprise Consultation">General Enterprise Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0B0C0E] mb-1">
              Project Description / Scope <span className="text-[#E11D2E]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project requirements, goals, timelines, or technology preferences..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#D1D5DB] rounded-md text-sm text-[#0B0C0E] placeholder:text-neutral-400 focus:outline-none focus:border-[#0B0C0E] focus:ring-1 focus:ring-[#0B0C0E]"
              id="enquiry-textarea-message"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-[#0B0C0E] hover:bg-[#E11D2E] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
            id="enquiry-submit-btn"
          >
            <span>Send Enquiry to WhatsApp</span>
            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] text-[#6B7280] text-center">
            Your message will open directly in WhatsApp web or the mobile app without email delays.
          </p>
        </form>
      )}
    </div>
  );
};
