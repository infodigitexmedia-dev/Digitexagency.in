import React from 'react';
import { X, ArrowUpRight, Check, ExternalLink, Globe } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';

export const ProjectModal: React.FC = () => {
  const { selectedProjectForModal, setSelectedProjectForModal, setIsInquiryModalOpen } = useWebsite();

  if (!selectedProjectForModal) return null;

  const project = selectedProjectForModal;

  const handleStartSimilar = () => {
    setSelectedProjectForModal(null);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs modal-backdrop-animate">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-200 modal-dialog-animate">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#E51B23] uppercase tracking-wide">
              {project.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">Case Study</span>
          </div>

          <button
            onClick={() => setSelectedProjectForModal(null)}
            className="p-1.5 text-gray-400 hover:text-black rounded-md hover:bg-gray-100 modal-close-btn"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
            {project.title}
          </h2>

          {/* Full Image */}
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-[16/9]">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F7F7F7] rounded-lg border border-gray-200 text-xs">
            <div>
              <span className="block font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Client / Brand
              </span>
              <span className="font-bold text-[#111111] text-sm">
                {project.client || 'Confidential Client'}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Service Practice
              </span>
              <span className="font-bold text-[#111111] text-sm">
                {project.category}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Delivery Model
              </span>
              <span className="font-bold text-[#111111] text-sm">
                Full-Lifecycle Agency Execution
              </span>
            </div>
          </div>

          {/* Scope & Narrative */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              Overview & Solution
            </h4>
            <p className="text-sm text-[#555555] leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Deliverables & Technologies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            {project.deliverables && project.deliverables.length > 0 && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Scope Deliverables
                </h5>
                <ul className="space-y-1.5 text-xs text-[#555555]">
                  {project.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#E51B23]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Technologies / Tools
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 text-gray-700 rounded border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F7F7F7] border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-gray-500">
            Interested in results like this for your organization?
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProjectForModal(null)}
              className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 rounded-md btn-interactive"
            >
              Close
            </button>
            <button
              onClick={handleStartSimilar}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded-md btn-interactive"
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
