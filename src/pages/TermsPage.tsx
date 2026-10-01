import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useData } from '../context/DataContext';

export const TermsPage: React.FC = () => {
  const { contactConfig } = useData();

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* Hero */}
      <section className="pt-16 pb-16 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
            <span>CONTRACTUAL TERMS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            Terms & Conditions
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
              <h2 className="text-lg font-bold text-[#111111] mb-2">1. Scope of Engagement</h2>
              <p className="text-[#6B7280]">
                These Terms and Conditions govern software engineering, user experience design, ecommerce integration, and digital marketing services provided by DIGITEX. All commercial engagements are executed pursuant to formal Statements of Work (SOW) outlining project deliverables, milestone schedules, and payment terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">2. Intellectual Property & Ownership</h2>
              <p className="text-[#6B7280]">
                Upon receipt of full payment for agreed milestones, 100% of bespoke code, database architectures, user interface assets, and custom documentation transfer exclusively to the client. DIGITEX retains no ongoing licensing claims or vendor lock-in rights to custom client applications.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">3. Warranty & Defect Rectification</h2>
              <p className="text-[#6B7280]">
                DIGITEX provides a standard 30-day post-launch warranty covering any functional bugs or regressions identified against the approved Statement of Work. Critical production hotfixes during this warranty period are deployed at zero additional cost.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">4. Confidentiality & Non-Disclosure</h2>
              <p className="text-[#6B7280]">
                Both parties agree to treat all business plans, product architectures, database schemas, and proprietary trade secrets shared during the engagement with utmost confidentiality under standard non-disclosure terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">5. Governing Law</h2>
              <p className="text-[#6B7280]">
                These Terms are governed by and construed in accordance with the laws of India. Any legal proceedings arising from engagements shall be subject to the exclusive jurisdiction of the courts of India.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#111111] mb-2">6. Contact Inquiries</h2>
              <p className="text-[#6B7280]">
                For contractual inquiries or formal vendor documentation:
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
