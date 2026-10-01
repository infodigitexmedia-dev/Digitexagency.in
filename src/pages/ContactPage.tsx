import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const ContactPage: React.FC = () => {
  const { contactConfig, submitEnquiry, services } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    submitEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service || 'General Inquiry',
      message: formData.message,
    });

    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi DIGITEX, my name is ${formData.name || 'a prospective client'}. I would like to discuss: ${
        formData.service ? `${formData.service} - ` : ''
      }${formData.message || 'a new digital project'}.`
    );
    window.open(`https://wa.me/919034242154?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>DIRECT CHANNELS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Get in Touch with{' '}
              <span className="text-[#E11D2E]">
                Our Team.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              We respond promptly to all inquiries. Reach out directly via WhatsApp, schedule a video consultation, or submit your project details below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT (LIGHT SECTION) */}
      <section className="py-24 bg-[#FAFAF8] border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Coordinates & Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2 mb-2">
                  <span className="w-2 h-0.5 bg-[#E11D2E]" />
                  OFFICE & CHANNELS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                  Direct Coordinates
                </h2>
              </div>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={contactConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E5E5E3] hover:border-[#E11D2E] hover:shadow-xs transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] text-[#111111] group-hover:text-[#E11D2E] flex items-center justify-center shrink-0 border border-[#E5E5E3] group-hover:border-[#E11D2E] transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                      WhatsApp Direct
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      +91 {contactConfig.phone} • Real-time solutions chat
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E5E5E3] hover:border-[#E11D2E] hover:shadow-xs transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] text-[#111111] group-hover:text-[#E11D2E] flex items-center justify-center shrink-0 border border-[#E5E5E3] group-hover:border-[#E11D2E] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                      Email Inquiries
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-0.5 truncate">
                      {contactConfig.email}
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${contactConfig.phone}`}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#E5E5E3] hover:border-[#E11D2E] hover:shadow-xs transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] text-[#111111] group-hover:text-[#E11D2E] flex items-center justify-center shrink-0 border border-[#E5E5E3] group-hover:border-[#E11D2E] transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors">
                      Direct Telephone
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      +91 {contactConfig.phone}
                    </p>
                  </div>
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E5E5E3] text-xs text-[#6B7280] flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#E11D2E] shrink-0" />
                <span>Operating hours: {contactConfig.operatingHours}</span>
              </div>
            </div>

            {/* Right: Message / Inquiry Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E5E5E3] shadow-xs">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-[#E11D2E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111]">
                    Inquiry Received
                  </h3>
                  <p className="text-[#6B7280] text-sm max-w-sm mx-auto">
                    Thank you, {formData.name}. Your details have been routed to our technical leads. We will review and respond shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-[#E11D2E] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
                      PROJECT INQUIRY
                    </span>
                    <h3 className="text-xl font-bold text-[#111111]">
                      Send a Direct Message
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#111111] block mb-1.5">
                        Service of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#111111] focus:bg-white"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#111111] block mb-1.5">
                      Project Overview / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your objectives, timeline, or current technical bottlenecks..."
                      className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs py-3.5 rounded-full shadow-xs transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-bold text-xs px-6 py-3.5 rounded-full shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
