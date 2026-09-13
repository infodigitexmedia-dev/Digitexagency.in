import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import { ProjectItem } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';

export const ProjectsSection: React.FC = () => {
  const { data, setSelectedProjectForModal } = useWebsite();
  const { content, projects } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const visibleProjects = projects
    .filter((p) => p.isVisible)
    .sort((a, b) => a.order - b.order);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(visibleProjects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? visibleProjects
      : visibleProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Category Filter */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E51B23] uppercase tracking-wider mb-2.5">
              <span>Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-[-0.02em] mb-3">
              {content.projectsHeading || 'Selected Work'}
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              {content.projectsSubheading ||
                'A showcase of client projects, digital platforms, and brand solutions developed by DIGITEX.'}
            </p>
          </div>

          {/* Clean Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F7F7F7] rounded-lg border border-gray-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 btn-interactive ${
                  selectedCategory === cat
                    ? 'bg-white text-[#111111] shadow-xs border border-gray-200/80 font-bold'
                    : 'text-[#777777] hover:text-[#111111] hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectItem, index: number) => (
            <ScrollReveal
              key={project.id}
              delay={index * 80}
              className="h-full"
            >
              <div
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:border-gray-300 card-hover-elevate flex flex-col cursor-pointer h-full"
                onClick={() => setSelectedProjectForModal(project)}
              >
                {/* Project Image Box with Controlled Boundary Scale */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-white/95 backdrop-blur-xs text-[#111111] rounded border border-gray-100 shadow-xs group-hover:border-gray-200 transition-colors">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#E51B23] transition-colors duration-200 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-[#555555] leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#111111] group-hover:text-[#E51B23] transition-colors duration-200">
                    <span>View Project Details</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note on Authenticity */}
        <ScrollReveal delay={200} className="mt-12 text-center text-xs text-[#777777]">
          <span>Projects documented above reflect real technical scopes and deliverables delivered by our design and engineering team.</span>
        </ScrollReveal>
      </div>
    </section>
  );
};
