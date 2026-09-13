import React from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import {
  Briefcase,
  Layers,
  MessageSquare,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  Inbox,
  CheckCircle,
  Clock,
  Trash2,
} from 'lucide-react';

export const OverviewTab: React.FC<{ onNavigate: (tabId: string) => void }> = ({ onNavigate }) => {
  const { data, setActiveView, deleteInquiry } = useWebsite();
  const { projects, services, testimonials, gallery, inquiries, statistics } = data;

  const activeProjects = projects.filter((p) => p.isVisible).length;
  const activeServices = services.filter((s) => s.isVisible).length;
  const activeTestimonials = testimonials.filter((t) => t.isVisible).length;
  const activeImages = gallery.filter((g) => g.isVisible).length;

  return (
    <div className="space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E51B23] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Live Agency Portal</span>
          </div>
          <h2 className="text-xl font-bold text-[#111111]">
            DIGITEX Content & Operations Dashboard
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            All modifications update the live public agency website immediately.
          </p>
        </div>

        <button
          onClick={() => setActiveView('public')}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          <Eye className="w-4 h-4 text-[#E51B23]" />
          <span>View Public Website</span>
        </button>
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('projects')}
          className="p-5 bg-white rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">Projects</span>
            <Briefcase className="w-4 h-4 text-[#E51B23]" />
          </div>
          <div className="text-2xl font-extrabold text-[#111111]">{activeProjects}</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {projects.length} total in catalog
          </div>
        </div>

        <div
          onClick={() => onNavigate('services')}
          className="p-5 bg-white rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">Services</span>
            <Layers className="w-4 h-4 text-[#E51B23]" />
          </div>
          <div className="text-2xl font-extrabold text-[#111111]">{activeServices}</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {services.length} active service practices
          </div>
        </div>

        <div
          onClick={() => onNavigate('testimonials')}
          className="p-5 bg-white rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">Testimonials</span>
            <MessageSquare className="w-4 h-4 text-[#E51B23]" />
          </div>
          <div className="text-2xl font-extrabold text-[#111111]">{activeTestimonials}</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {testimonials.length} reviews recorded
          </div>
        </div>

        <div
          onClick={() => onNavigate('gallery')}
          className="p-5 bg-white rounded-lg border border-gray-200 shadow-xs hover:border-gray-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">Media Gallery</span>
            <ImageIcon className="w-4 h-4 text-[#E51B23]" />
          </div>
          <div className="text-2xl font-extrabold text-[#111111]">{activeImages}</div>
          <div className="text-[11px] text-gray-500 mt-1">
            {gallery.length} visual assets stored
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#E51B23]" />
            <h3 className="text-base font-bold text-[#111111]">Client Inquiries & Briefs</h3>
          </div>
          <span className="text-xs text-gray-500">
            {inquiries.length} total received
          </span>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 bg-[#F7F7F7] rounded">
            No incoming client inquiries yet. Submissions through WhatsApp and Web Form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F7F7] text-gray-700 uppercase font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-3">Client</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-[#111111]">
                      <div>{inq.name}</div>
                      <div className="text-[11px] text-gray-500 font-normal">
                        {inq.email} • {inq.phone}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inq.channel === 'WhatsApp' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {inq.channel}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-gray-700">{inq.service}</td>
                    <td className="p-3 text-gray-600 max-w-xs truncate" title={inq.message}>
                      {inq.message}
                    </td>
                    <td className="p-3 text-gray-400 whitespace-nowrap">{inq.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Setup Checklist */}
      <div className="bg-[#F7F7F7] p-5 rounded-lg border border-gray-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
          Agency Owner Quick Tips
        </h4>
        <ul className="text-xs text-gray-600 space-y-1.5">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Statistics Section is currently {statistics.showPublicly ? 'VISIBLE' : 'HIDDEN'} on the public site (toggle in Statistics tab).</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp messages connect directly to: <span className="font-semibold">{data.contact.whatsappNumber}</span> (edit in Contact Info tab).</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export complete site backup anytime via Settings tab to keep offline copies.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
