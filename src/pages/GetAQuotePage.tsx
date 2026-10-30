import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Send,
  Calculator,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const GetAQuotePage: React.FC = () => {
  const { services, contactConfig, submitEnquiry } = useData();

  const [selectedServices, setSelectedServices] = useState<string[]>(['Web Development']);
  const [timeline, setTimeline] = useState<string>('1 - 2 Months');
  const [budgetTier, setBudgetTier] = useState<string>('Standard Project');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== title));
      }
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    submitEnquiry({
      name,
      phone,
      email,
      service: selectedServices.join(', '),
      message: `[Quote Request] Timeline: ${timeline} | Tier: ${budgetTier} | Scope Details: ${notes || 'Standard implementation'}`,
    });

    setSubmitted(true);
  };

  const handleWhatsAppForward = () => {
    const msg = encodeURIComponent(
      `Hi DIGITEX, I would like an estimate for: ${selectedServices.join(
        ', '
      )}. Target Timeline: ${timeline}. Tier: ${budgetTier}. My name is ${name || 'Prospective Client'}. ${notes ? `Notes: ${notes}` : ''}`
    );
    window.open(`https://wa.me/919034242154?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>PROJECT ESTIMATOR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Scope Your Next{' '}
              <span className="text-[#E11D2E]">
                Digital Milestone.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              Select your required capabilities, delivery schedule, and functional scope. Our technical leads will provide an itemized sprint roadmap within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ESTIMATOR FORM (LIGHT SECTION) */}
      <section className="py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#E5E5E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E5E3] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-[#E11D2E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                  Scoping Request Received
                </h3>
                <p className="text-[#6B7280] text-sm max-w-md mx-auto">
                  Thank you, {name}. We have logged your request for {selectedServices.join(', ')}. Our engineering leads will review your parameters and prepare an itemized proposal.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#E11D2E] hover:underline"
                  >
                    Configure another estimate
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* 1. Required Services */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                      1. Select Required Capabilities *
                    </label>
                    <span className="text-[11px] text-[#6B7280]">Multi-select enabled</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {services.map((s) => {
                      const isSelected = selectedServices.includes(s.title);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.title)}
                          className={`p-3.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#E11D2E] text-white border-[#E11D2E] shadow-xs'
                              : 'bg-[#FAFAF8] text-[#111111] border-[#E5E5E3] hover:border-[#E11D2E]'
                          }`}
                        >
                          <div className="truncate">{s.title}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Target Delivery Schedule */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                    2. Target Delivery Timeline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Under 1 Month', '1 - 2 Months', '2 - 4 Months', 'Flexible / Ongoing'].map(
                      (tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setTimeline(tier)}
                          className={`p-3 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                            timeline === tier
                              ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                              : 'bg-[#FAFAF8] text-[#2A2A2A] border-[#E5E5E3] hover:border-[#111111]'
                          }`}
                        >
                          {tier}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* 3. Budget Tier */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                    3. Approximate Investment Scale
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Starter Sprint', desc: 'MVP / Focused Redesign' },
                      { id: 'Standard Project', desc: 'Full Platform / Storefront' },
                      { id: 'Enterprise Custom', desc: 'Bespoke Software / Retainer' },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setBudgetTier(tier.id)}
                        className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                          budgetTier === tier.id
                            ? 'bg-[#FAFAF8] border-[#E11D2E] text-[#111111] ring-1 ring-[#E11D2E]'
                            : 'bg-[#FAFAF8] border-[#E5E5E3] text-[#2A2A2A] hover:border-[#111111]'
                        }`}
                      >
                        <div className="font-bold text-xs">{tier.id}</div>
                        <div className="text-[11px] text-[#6B7280] mt-1">{tier.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Contact Details */}
                <div className="space-y-4 pt-4 border-t border-[#E5E5E3]">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                    4. Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        required
                        type="text"
                        placeholder="Your Name *"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white"
                      />
                    </div>
                    <div>
                      <input
                        required
                        type="tel"
                        placeholder="Phone / WhatsApp Number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Work Email (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific APIs, third-party integrations, design preferences, or target launch date..."
                      className="w-full bg-[#FAFAF8] border border-[#E5E5E3] rounded-xl px-4 py-3 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#111111] focus:bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs py-4 rounded-full shadow-xs transition-colors cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Generate Proposal & Estimate</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppForward}
                    className="inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#2A2A2A] text-white font-bold text-xs px-6 py-4 rounded-full shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Prefer a direct conversation?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Connect immediately with our technical directors on WhatsApp for real-time consultation.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={contactConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
