import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useData } from '../context/DataContext';

export const FaqPage: React.FC = () => {
  const { faqs: cmsFaqs, contactConfig } = useData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs = [
    {
      id: 'default-1',
      question: 'Do we own 100% of the code and intellectual property produced by DIGITEX?',
      answer: 'Yes, unconditionally. Upon final milestone sign-off, all intellectual property, source repositories, production credentials, Figma assets, and documentation are transferred fully to your organization with zero proprietary licensing or ongoing vendor lock-in fees.',
      category: 'General',
    },
    {
      id: 'default-2',
      question: 'How does DIGITEX manage communication, sprints, and delivery reporting?',
      answer: 'We operate in 2-week agile sprints. You receive direct access to a dedicated Slack or Teams channel with our technical lead, weekly demo video check-ins, and automated staging deployments after every approved Pull Request.',
      category: 'General',
    },
    {
      id: 'default-3',
      question: 'What is your typical project kickoff timeline and delivery schedule?',
      answer: 'Discovery sprints typically kick off within 5 to 7 business days following agreement execution. Complete web platforms and custom applications typically ship in 6 to 12 weeks depending on third-party integrations and backend complexity.',
      category: 'General',
    },
    {
      id: 'default-4',
      question: 'Do you provide post-launch maintenance, SLAs, and cloud infrastructure support?',
      answer: 'Yes. We offer enterprise maintenance retainers that cover 24/7 uptime monitoring, security patching, dependency upgrades, cloud cost optimization, and proactive feature enhancements backed by defined response SLAs.',
      category: 'General',
    },
    {
      id: 'default-5',
      question: 'Can DIGITEX integrate with our internal engineering squad or legacy systems?',
      answer: 'Absolutely. We frequently operate as an integrated SWAT team alongside internal engineering squads, adhering to your internal Git workflows, automated testing pipelines, and architectural standards.',
      category: 'General',
    },
  ];

  const activeFaqs =
    cmsFaqs && cmsFaqs.length > 0
      ? cmsFaqs.filter((f) => f.status !== 'draft')
      : defaultFaqs;

  return (
    <div className="bg-[#FAFAF8] text-[#111111] selection:bg-[#E11D2E] selection:text-white">
      {/* 1. HERO SECTION (LIGHT / WARM WHITE) */}
      <section className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[#FAFAF8] text-[#111111] border-b border-[#E5E5E3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Clear Answers to{' '}
              <span className="text-[#E11D2E]">
                Common Questions.
              </span>
            </h1>

            <p className="text-[#2A2A2A] text-base sm:text-lg leading-relaxed">
              Everything you need to know about partnering with DIGITEX: contract structures, code ownership, sprint delivery, and post-launch technical support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ACCORDION SECTION (LIGHT SECTION) */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] block">
                SUPPORT & POLICIES
              </span>
              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">
                Have a different question?
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Our solutions architects are available to review unique technical constraints, NDA requirements, and custom RFPs.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-xs transition-colors"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Accordion Cards */}
            <div className="lg:col-span-8 space-y-4">
              {activeFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id || idx}
                    className={`rounded-2xl transition-all border ${
                      isOpen
                        ? 'bg-[#FAFAF8] border-[#E11D2E]/40 shadow-xs ring-1 ring-[#E11D2E]/20'
                        : 'bg-white border-[#E5E5E3] shadow-xs hover:border-[#111111]/30'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className={`text-base font-bold transition-colors ${isOpen ? 'text-[#E11D2E]' : 'text-[#111111]'}`}>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#E11D2E] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-[#6B7280] leading-relaxed border-t border-[#E5E5E3] pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DARK CTA */}
      <section className="py-20 lg:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to initiate a conversation?
          </h2>
          <p className="text-[#9CA3AF] text-base mt-4 max-w-xl mx-auto">
            Submit your requirements for a quote or send us your scope directly on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={contactConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-8 py-3.5 rounded-full transition-colors"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
