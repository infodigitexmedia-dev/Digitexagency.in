import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useData } from '../context/DataContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { contactConfig } = useData();

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* Hero */}
      <section className="pt-16 pb-16 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
            <span>LEGAL & GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#6B7280] mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Light Content */}
      <section className="py-16 bg-[#FAFAF8] border-b border-[#E5E5E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-[#2A2A2A] space-y-8 leading-relaxed">
          <div className="bg-white p-8 rounded-2xl border border-[#E5E5E3] shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">1. Overview</h2>
              <p className="text-[#6B7280]">
                DIGITEX (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting the privacy of clients, website visitors, and partners. This Privacy Policy details how we handle information collected through our website, consultation booking links, and communication channels.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">2. Information We Collect</h2>
              <p className="text-[#6B7280]">
                When you submit a contact inquiry, request a proposal, or message us via WhatsApp, we collect information you voluntarily provide, which may include your name, business email address, phone number, company name, and details regarding your technical scope.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">3. How Information Is Used</h2>
              <p className="text-[#6B7280]">
                Information is exclusively used to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm text-[#6B7280]">
                <li>Respond to inquiries and prepare technical architecture proposals.</li>
                <li>Coordinate discovery sessions and technical roadmap milestones.</li>
                <li>Deliver contractual development, design, and marketing services.</li>
                <li>Maintain security, prevent fraudulent activity, and enforce contractual agreements.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">4. Data Protection & Confidentiality</h2>
              <p className="text-[#6B7280]">
                We implement industry-standard physical, electronic, and administrative safeguards. We do not sell, rent, or trade client or prospect information to third-party brokers or advertisers under any circumstances. All client proprietary code, schema designs, and project data are governed by strict confidentiality obligations.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">5. Third-Party Integrations</h2>
              <p className="text-[#6B7280]">
                Our website facilitates communications via WhatsApp. Interacting with these external tools is subject to the respective privacy terms of Meta Platforms, Inc.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">6. Contact Information</h2>
              <p className="text-[#6B7280]">
                For privacy-related inquiries, reach out to:
              </p>
              <div className="mt-3 p-4 bg-[#FAFAF8] rounded-xl border border-[#E5E5E3] text-xs font-mono text-[#111111]">
                <p>Email: {contactConfig.email}</p>
                <p>Phone: +91 {contactConfig.phone}</p>
                <p>Address: {contactConfig.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
