import React, { useState } from 'react';
import { X, Send, AlertCircle, Loader2 } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const InquiryModal: React.FC = () => {
  const { isInquiryModalOpen, setIsInquiryModalOpen, data, addInquiry, showToast } = useWebsite();
  const { services } = data;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: services[0]?.name || 'Web Development',
    timeline: 'Within 2-4 weeks',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({});

  const [isOpening, setIsOpening] = useState(false);

  if (!isInquiryModalOpen) return null;

  const whatsappNumber = '919034242154';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errors: { name?: string; phone?: string; email?: string; message?: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else {
      const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }

    // Email is optional; validate format only if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email format.';
      }
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your project scope.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsOpening(true);
    showToast('Opening WhatsApp...');

    const messageLines: string[] = [
      'Hello DIGITEX,',
      '',
      'I would like to enquire about your services.',
      '',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
    ];

    if (formData.email.trim()) {
      messageLines.push('', `Email: ${formData.email.trim()}`);
    }

    messageLines.push(
      '',
      'Message:',
      formData.message.trim(),
      '',
      'Please get back to me regarding my enquiry.'
    );

    const msg = messageLines.join('\n');
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

    addInquiry({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || 'Not provided',
      service: `${formData.service} (${formData.timeline})`,
      message: formData.message.trim(),
      channel: 'WhatsApp',
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsOpening(false);
      setIsInquiryModalOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop-animate">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden border border-gray-200 modal-dialog-animate">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#111111]">Start a Project</h3>
            <p className="text-xs text-gray-500">Brief us on your requirements</p>
          </div>
          <button
            onClick={() => {
              setIsInquiryModalOpen(false);
            }}
            className="p-1 text-gray-400 hover:text-black rounded modal-close-btn"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rohit Sharma"
                  className={`w-full px-3 py-2 text-xs border rounded focus:outline-none focus:border-black ${
                    fieldErrors.name ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-[10px] text-red-600 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rohit@brand.in"
                  className={`w-full px-3 py-2 text-xs border rounded focus:outline-none focus:border-black ${
                    fieldErrors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[10px] text-red-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className={`w-full px-3 py-2 text-xs border rounded focus:outline-none focus:border-black ${
                    fieldErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                  }`}
                />
                {fieldErrors.phone && (
                  <p className="text-[10px] text-red-600 mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Service Required
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-black"
                >
                  {services
                    .filter((s) => s.isVisible)
                    .map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  <option value="Full Digital Retainer">Full Digital Retainer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Target Timeline
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-black"
              >
                <option value="Urgent (1-2 weeks)">Urgent (1-2 weeks)</option>
                <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="Flexible / Planning phase">Flexible / Planning phase</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Brief Overview of Project *
              </label>
              <textarea
                name="message"
                rows={3}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Outline what you want to build or improve..."
                className={`w-full px-3 py-2 text-xs border rounded focus:outline-none focus:border-black ${
                  fieldErrors.message ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                }`}
              />
              {fieldErrors.message && (
                <p className="text-[10px] text-red-600 mt-1">{fieldErrors.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isOpening}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] disabled:opacity-75 disabled:cursor-not-allowed rounded btn-interactive transition-all"
              >
                {isOpening ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Opening WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
