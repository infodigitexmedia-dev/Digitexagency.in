import React, { useState, useEffect } from 'react';
import { X, Upload, Check, Image as ImageIcon, Search, ExternalLink, Loader2 } from 'lucide-react';
import { MediaAsset } from '../../types';

interface ImageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string, altText?: string) => void;
  currentImage?: string;
  title?: string;
}

export const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  currentImage = '',
  title = 'Select Image',
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState(currentImage);
  const [customUrl, setCustomUrl] = useState('');
  const [customAlt, setCustomAlt] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Fetch media library when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedUrl(currentImage);
      fetchMedia();
    }
  }, [isOpen, currentImage]);

  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const token = sessionStorage.getItem('digitex_owner_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/owner/media', { headers, credentials: 'include' });
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.media)) {
          setMediaList(json.media);
        }
      }
    } catch (err) {
      console.warn('Error fetching media:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (customAlt) {
        formData.append('alt', customAlt);
      }

      const token = sessionStorage.getItem('digitex_owner_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/owner/media/upload', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.media) {
        setMediaList((prev) => [json.media, ...prev]);
        setSelectedUrl(json.media.url);
        onSelect(json.media.url, json.media.alt);
        onClose();
      } else {
        setUploadError(json.error || 'Upload failed');
      }
    } catch (err) {
      setUploadError('Network error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = () => {
    if (activeTab === 'url' && customUrl.trim()) {
      onSelect(customUrl.trim(), customAlt.trim());
      onClose();
    } else if (selectedUrl) {
      const selectedItem = mediaList.find((m) => m.url === selectedUrl);
      onSelect(selectedUrl, selectedItem?.alt);
      onClose();
    }
  };

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter(
    (m) =>
      m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.alt && m.alt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-[#0B1220] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-[#22D3EE] flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-wide text-white uppercase">{title}</h3>
              <p className="text-[11px] text-slate-400">Choose from Media Library, upload new file, or enter URL</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-slate-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors ${
              activeTab === 'library'
                ? 'bg-[#0B1220] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Media Library ({mediaList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors ${
              activeTab === 'upload'
                ? 'bg-[#0B1220] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upload New File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-colors ${
              activeTab === 'url'
                ? 'bg-[#0B1220] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            External Image URL
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[360px]">
          {activeTab === 'library' && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search media by filename or alt text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {loadingMedia ? (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
                  <span className="text-xs">Loading media assets...</span>
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-white/15 rounded-2xl p-6">
                  <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-300">No media assets found</p>
                  <p className="text-[11px] text-slate-500 mt-1">Upload an image file using the Upload tab above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {filteredMedia.map((item) => {
                    const isSelected = selectedUrl === item.url;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedUrl(item.url)}
                        className={`group relative aspect-video rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-slate-950 ${
                          isSelected
                            ? 'border-cyan-400 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/50'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={item.alt || item.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2">
                          <p className="text-[10px] font-bold text-white truncate">{item.filename}</p>
                          {item.usageCount !== undefined && item.usageCount > 0 && (
                            <span className="inline-block text-[9px] text-cyan-300 font-semibold">
                              Used in {item.usageCount} location{item.usageCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-md mx-auto space-y-4 py-6">
              <div className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/60 rounded-3xl p-8 text-center bg-cyan-950/20 transition-all flex flex-col items-center justify-center">
                <Upload className="w-10 h-10 text-cyan-400 mb-3" />
                <h4 className="text-sm font-bold text-white mb-1">Upload New Media Asset</h4>
                <p className="text-xs text-slate-400 mb-4 max-w-xs">
                  Supported formats: WebP, PNG, JPG, SVG, GIF (up to 12MB). File is stored permanently on server.
                </p>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1677FF] to-[#22D3EE] hover:from-[#1366DB] hover:to-[#1CB8D0] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 cursor-pointer uppercase tracking-wider transition-transform hover:scale-[1.02]">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploading ? 'Uploading to Server...' : 'Select File From Device'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadError && (
                <div className="p-3 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-xl">
                  {uploadError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Default Alt Text</label>
                <input
                  type="text"
                  placeholder="Describe image for SEO and accessibility"
                  value={customAlt}
                  onChange={(e) => setCustomAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="max-w-lg mx-auto space-y-4 py-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">External Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Alt Text</label>
                <input
                  type="text"
                  placeholder="Describe image content"
                  value={customAlt}
                  onChange={(e) => setCustomAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {customUrl && (
                <div className="mt-4 p-3 bg-slate-900 border border-white/10 rounded-xl">
                  <p className="text-[11px] font-bold text-slate-400 mb-2">Live Preview:</p>
                  <img
                    src={customUrl}
                    alt="Preview"
                    className="max-h-48 rounded-lg object-contain mx-auto bg-black"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-slate-900/50">
          <div className="text-xs text-slate-400 truncate max-w-sm">
            {selectedUrl ? (
              <span className="text-cyan-300 truncate block">Selected: {selectedUrl}</span>
            ) : (
              <span>No image chosen</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={activeTab === 'url' ? !customUrl : !selectedUrl}
              className="px-6 py-2 bg-gradient-to-r from-[#1677FF] to-[#22D3EE] hover:from-[#1366DB] hover:to-[#1CB8D0] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              Use Selected Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
