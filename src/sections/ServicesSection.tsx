import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { ServiceIcon } from '../components/ServiceIcon';
import { ScrollReveal } from '../components/ScrollReveal';

export const ServicesSection: React.FC = () => {
  const { data, setIsInquiryModalOpen } = useWebsite();
  const { content, services } = data;

  // Filter only visible services and sort by order
  const visibleServices = services
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const handleServiceInquiry = (serviceName: string) => {
    // Scroll to contact and populate or open inquiry modal
    const serviceSelect = document.getElementById('contact-service-select') as HTMLSelectElement | null;
    if (serviceSelect) {
      serviceSelect.value = serviceName;
    }
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsInquiryModalOpen(true);
    }
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-[#F7F7F7] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E51B23] uppercase tracking-wider mb-2.5">
            <span>Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-[-0.02em] mb-4">
            {content.servicesHeading || 'What We Do'}
          </h2>
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            {content.servicesSubheading ||
              'Practical digital solutions designed to help businesses build, grow and connect.'}
          </p>
        </ScrollReveal>

        {/* 6-Grid Services Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 80}
              className="h-full"
            >
              <div
                id={`service-card-${index}`}
                onClick={() => handleServiceInquiry(service.name)}
                className="group bg-white rounded-lg p-7 border border-gray-200/90 shadow-xs hover:border-gray-300 card-hover-elevate flex flex-col justify-between cursor-pointer h-full"
              >
                <div>
                  {/* Small Icon container with subtle lift & 1.5deg tilt */}
                  <div className="w-10 h-10 rounded-md bg-[#F7F7F7] border border-gray-200 flex items-center justify-center text-[#111111] group-hover:text-white group-hover:bg-[#E51B23] group-hover:border-[#E51B23] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:rotate-1 transition-all duration-200 ease-out mb-6">
                    <ServiceIcon name={service.iconName} className="w-5 h-5 transition-transform duration-200" />
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl font-bold text-[#111111] mb-2.5 tracking-tight group-hover:text-[#E51B23] transition-colors duration-200">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-[#555555] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Small Arrow / Action Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#555555] group-hover:text-[#E51B23] transition-colors duration-200">
                  <span>Discuss Project</span>
                  <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#E51B23]/10 transition-colors duration-200">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
