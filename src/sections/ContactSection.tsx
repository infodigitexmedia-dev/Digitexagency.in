import React, { useState } from 'react';
import { MessageSquare, Mail, MapPin, Send, Phone, Instagram, AlertCircle, Loader2, Calendar } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { ScrollReveal } from '../components/ScrollReveal';

export const ContactSection: React.FC = () => {
  const { data, addInquiry, showToast } = useWebsite();
  const { content, contact, services } = data;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: services[0]?.name || 'Web Development',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({});

  const [isOpening, setIsOpening] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // DIGITEX owner's official destination WhatsApp and contact information
  const officialPhone = '9034242154';
  const whatsappNumber = '919034242154';
  const officialEmail = 'info.digitex.media@gmail.com';
  const officialInstagram =
    'https://www.instagram.com/digitexagency.in?stkn=MTY3cmxudzJ3dXEydA==';

  const validateForm = () => {
    const errors: { name?: string; phone?: string; email?: string; message?: string } = {};

    // Name: Required
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    // Customer Phone: Required
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else {
      const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }

    // Email: Optional; validate format only if entered
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email format (e.g. name@domain.com).';
      }
    }

    // Message: Required
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error on change
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (statusNotice) {
      setStatusNotice(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsOpening(true);
    setStatusNotice('Opening WhatsApp...');
    showToast('Opening WhatsApp...');

    // Compose professional pre-filled WhatsApp message with customer details
    const messageLines: string[] = [
      'Hello DIGITEX,',
      '',
      'I would like to enquire about your services.',
      '',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
    ];

    // Include email only if entered
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

    const whatsappMessage = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Log enquiry to agency context
    addInquiry({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || 'Not provided',
      service: formData.service,
      message: formData.message.trim(),
      channel: 'WhatsApp',
    });

    // Open WhatsApp with owner's number as destination
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset button after short duration without clearing customer's input
    setTimeout(() => {
      setIsOpening(false);
      setStatusNotice(null);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#F7F7F7] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Official Contact Channels */}
          <ScrollReveal className="lg:col-span-5" yOffset={20}>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E51B23] uppercase tracking-wider mb-2.5">
              <span>Contact DIGITEX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-[-0.02em] mb-4">
              {content.contactHeading || "Let's Work Together"}
            </h2>
            <p className="text-base text-[#555555] leading-relaxed mb-8">
              {content.contactSubheading ||
                'Have an upcoming project or need advice on your digital presence? Tell us about your goals and our team will get in touch.'}
            </p>

            {/* Google Calendar Consultation Card */}
            <div className="mb-6 p-5 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-all duration-200 card-hover-elevate">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-md bg-red-50 text-[#E51B23] border border-red-100 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#E51B23] uppercase tracking-wider">
                    Direct Consultation
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#111111]">
                    Book a 1-on-1 Strategy Call
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5 leading-relaxed">
                    Schedule a meeting directly on our Google Calendar.
                  </div>
                </div>
              </div>

              <a
                href="https://calendar.app.google/9FTypfkU2VspvcbY7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#E51B23] hover:bg-[#c9141b] border border-[#c9141b] rounded-md shadow-xs hover:-translate-y-[2px] hover:shadow-md transition-all duration-200 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#E51B23] focus:ring-offset-2"
                title="Book a consultation with DIGITEX"
                aria-label="Book a consultation with DIGITEX"
                id="contact-book-call-btn"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>BOOK A CALL</span>
              </a>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Official Email Card */}
              <a
                href={`mailto:${officialEmail}`}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 card-hover-elevate transition-all duration-300 group"
                id="contact-email-link"
                title="Send an email to DIGITEX"
              >
                <div className="w-10 h-10 rounded bg-gray-100 text-[#111111] flex items-center justify-center shrink-0 group-hover:bg-[#E51B23] group-hover:text-white group-hover:scale-105 transition-all duration-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-sm font-bold text-[#111111] group-hover:text-[#E51B23] transition-colors">
                    {officialEmail}
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    Click to open your default email app
                  </div>
                </div>
              </a>

              {/* Official Phone / Mobile Dialer Card */}
              <a
                href={`tel:${officialPhone}`}
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 card-hover-elevate transition-all duration-300 group"
                id="contact-phone-link"
                title="Call DIGITEX on mobile dialer"
              >
                <div className="w-10 h-10 rounded bg-gray-100 text-[#111111] flex items-center justify-center shrink-0 group-hover:bg-[#E51B23] group-hover:text-white group-hover:scale-105 transition-all duration-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                    Direct Phone Line
                  </div>
                  <div className="text-sm font-bold text-[#111111] group-hover:text-[#E51B23] transition-colors">
                    {officialPhone}
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    Click to call directly on mobile
                  </div>
                </div>
              </a>

              {/* Official WhatsApp Card */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello DIGITEX, I would like to enquire about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 card-hover-elevate transition-all duration-300 group"
                id="contact-whatsapp-link"
                title="Chat on WhatsApp"
              >
                <div className="w-10 h-10 rounded bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                    WhatsApp Channel
                  </div>
                  <div className="text-sm font-bold text-[#111111] group-hover:text-[#E51B23] transition-colors">
                    {officialPhone}
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    Direct chat for consultations & project scoping
                  </div>
                </div>
              </a>

              {/* Official Instagram Card */}
              <a
                href={officialInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 card-hover-elevate transition-all duration-300 group"
                id="contact-instagram-link"
                title="Visit DIGITEX on Instagram"
              >
                <div className="w-10 h-10 rounded bg-gray-100 text-[#111111] flex items-center justify-center shrink-0 group-hover:bg-[#E51B23] group-hover:text-white group-hover:-translate-y-0.5 group-hover:scale-105 transition-all duration-200">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                    Official Instagram
                  </div>
                  <div className="text-sm font-bold text-[#111111] group-hover:text-[#E51B23] transition-colors">
                    @digitexagency.in
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    Follow case studies, updates & agency work
                  </div>
                </div>
              </a>

              {/* Office Location */}
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 card-hover-elevate transition-all duration-300">
                <div className="w-10 h-10 rounded bg-gray-100 text-[#111111] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
                    Office & Operations
                  </div>
                  <div className="text-sm font-bold text-[#111111]">
                    {contact.city || 'Pune / Mumbai, India'}
                  </div>
                  <div className="text-xs text-[#555555] mt-0.5">
                    {contact.address || 'Commercial Tower, Cyber Hub Road'}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Contact Form */}
          <ScrollReveal delay={150} className="lg:col-span-7" yOffset={20}>
            <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-200 shadow-xs">
              <form onSubmit={handleFormSubmit} className="space-y-5" id="agency-contact-form" noValidate>
                {/* Status Notice */}
                {statusNotice && (
                  <div
                    className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-2.5 text-xs text-emerald-800"
                    role="status"
                    id="contact-form-status-notice"
                  >
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600 shrink-0" />
                    <span>{statusNotice}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Vikram Joshi"
                      className={`w-full px-4 py-2.5 text-sm bg-white border rounded-md input-focus-smooth ${
                        fieldErrors.name ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                      Email (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vikram@company.com"
                      className={`w-full px-4 py-2.5 text-sm bg-white border rounded-md input-focus-smooth ${
                        fieldErrors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Customer Phone Number (Required) */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-4 py-2.5 text-sm bg-white border rounded-md input-focus-smooth ${
                        fieldErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="contact-service-select" className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                      Service Needed
                    </label>
                    <select
                      id="contact-service-select"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-md input-focus-smooth"
                    >
                      {services
                        .filter((s) => s.isVisible)
                        .map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      <option value="General Digital Strategy">Other / General Consultation</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                    Project Details & Goals *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, requirements, timeline or goals..."
                    className={`w-full px-4 py-2.5 text-sm bg-white border rounded-md input-focus-smooth ${
                      fieldErrors.message ? 'border-red-400 bg-red-50/20' : 'border-gray-300'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="text-[11px] text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isOpening}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] disabled:opacity-75 disabled:cursor-not-allowed rounded-md shadow-xs btn-interactive transition-all"
                    id="contact-submit-btn"
                  >
                    {isOpening ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Opening WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
