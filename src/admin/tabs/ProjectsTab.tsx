import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { ProjectItem } from '../../types';
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, ExternalLink, Image as ImageIcon } from 'lucide-react';

export const ProjectsTab: React.FC = () => {
  const { data, addProject, updateProject, deleteProject, reorderProjects } = useWebsite();
  const { projects } = data;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    fullDescription: '',
    imageUrl: '',
    client: '',
    deliverables: 'UI/UX Design, Development, SEO',
    technologies: 'React, Tailwind CSS, TypeScript',
    projectUrl: '',
    isVisible: true,
  });

  const categories = [
    'Web Development',
    'Branding',
    'Digital Marketing',
    'Mobile App Development',
    'AI Solutions',
    'General Digital Strategy',
  ];

  const handleOpenAdd = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Web Development',
      description: '',
      fullDescription: '',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      client: '',
      deliverables: 'UI/UX Design, Frontend Development, Hosting Setup',
      technologies: 'React, TypeScript, Tailwind',
      projectUrl: '',
      isVisible: true,
    });
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setIsEditing(true);
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      fullDescription: project.fullDescription || '',
      imageUrl: project.imageUrl,
      client: project.client || '',
      deliverables: (project.deliverables || []).join(', '),
      technologies: (project.technologies || []).join(', '),
      projectUrl: project.projectUrl || '',
      isVisible: project.isVisible,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deliverableArray = formData.deliverables
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const techArray = formData.technologies
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingId) {
      updateProject(editingId, {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        fullDescription: formData.fullDescription,
        imageUrl: formData.imageUrl,
        client: formData.client,
        deliverables: deliverableArray,
        technologies: techArray,
        projectUrl: formData.projectUrl,
        isVisible: formData.isVisible,
      });
    } else {
      addProject({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        fullDescription: formData.fullDescription,
        imageUrl: formData.imageUrl,
        client: formData.client,
        deliverables: deliverableArray,
        technologies: techArray,
        projectUrl: formData.projectUrl,
        isVisible: formData.isVisible,
      });
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < projects.length) {
      reorderProjects(index, targetIndex);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">Project Portfolio Management</h2>
          <p className="text-xs text-gray-500">
            Showcase real digital solutions, case studies, and deliverables.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E51B23] hover:bg-[#c9141b] rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Editor Form Modal / Drawer */}
      {isEditing && (
        <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-[#111111]">
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Aura Living — Architecture Platform"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Client / Brand Name
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="e.g. Aura Architectural Group"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Live Project / Case URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Project Image URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-10 h-10 object-cover rounded border border-gray-300"
                  />
                )}
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                Provide an image URL from Unsplash or your asset host showing real design or web screenshots.
              </p>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Short Summary (Card Description) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief 1-2 sentence description for portfolio cards..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Extended Case Narrative
              </label>
              <textarea
                rows={3}
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Detailed explanation of the challenge, approach, and technical execution..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  placeholder="UI Design, Web Development, SEO"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is-visible-check"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 text-[#E51B23]"
              />
              <label htmlFor="is-visible-check" className="font-semibold text-gray-800">
                Visible on Public Website
              </label>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-white bg-[#E51B23] hover:bg-[#c9141b] rounded font-semibold"
              >
                {editingId ? 'Save Changes' : 'Publish Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-[#F7F7F7] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-700">
          <span>Catalog of Projects ({projects.length})</span>
          <span className="text-[11px] font-normal text-gray-500">
            Use arrows to reorder
          </span>
        </div>

        <div className="divide-y divide-gray-200">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                project.isVisible ? 'bg-white' : 'bg-gray-50 opacity-75'
              }`}
            >
              {/* Project Info & Thumbnail */}
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-16 h-12 rounded object-cover border border-gray-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#E51B23]">
                      {project.category}
                    </span>
                    {!project.isVisible && (
                      <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-[10px] rounded font-semibold">
                        Hidden
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] truncate">{project.title}</h4>
                  <p className="text-xs text-gray-500 truncate max-w-md">{project.description}</p>
                </div>
              </div>

              {/* Actions & Ordering */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {/* Order Up/Down */}
                <div className="flex items-center border border-gray-200 rounded bg-white">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1.5 text-gray-500 hover:text-black disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1.5 text-gray-500 hover:text-black disabled:opacity-30 border-l border-gray-200"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Visibility Toggle */}
                <button
                  onClick={() => updateProject(project.id, { isVisible: !project.isVisible })}
                  className="p-1.5 text-gray-500 hover:text-black border border-gray-200 rounded bg-white"
                  title={project.isVisible ? 'Hide from public site' : 'Show on public site'}
                >
                  {project.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-1.5 text-gray-700 hover:text-black border border-gray-200 rounded bg-white"
                  title="Edit project details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${project.title}"?`)) {
                      deleteProject(project.id);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-600 border border-gray-200 rounded bg-white"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
