import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  Clock,
  Calendar,
  Sparkles,
  Tag,
  BookOpen,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const BlogPage: React.FC = () => {
  const { blogs } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedBlogs = useMemo(() => {
    return (blogs || []).filter((b) => b && b.status !== 'draft');
  }, [blogs]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    publishedBlogs.forEach((b) => {
      if (b && b.category) set.add(b.category);
    });
    return ['All', ...Array.from(set)];
  }, [publishedBlogs]);

  // Safe Author & Date helpers to prevent any runtime undefined errors
  const getAuthor = (post?: any) => {
    if (!post || !post.author) {
      return {
        name: 'Aarav Mehta',
        role: 'Principal Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
    }
    if (typeof post.author === 'string') {
      return {
        name: post.author,
        role: 'Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
    }
    return {
      name: post.author.name || 'Aarav Mehta',
      role: post.author.role || 'Principal Solutions Architect',
      avatar:
        post.author.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
  };

  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter((post) => {
      if (!post) return false;
      const cat = post.category || 'General';
      const matchesCategory =
        selectedCategory === 'All' || cat.toLowerCase() === selectedCategory.toLowerCase();
      const q = (searchQuery || '').toLowerCase().trim();
      if (!q) return matchesCategory;

      const titleMatch = (post.title || '').toLowerCase().includes(q);
      const excerptMatch = (post.excerpt || '').toLowerCase().includes(q);
      const tagMatch =
        Array.isArray(post.tags) &&
        post.tags.some((t) => typeof t === 'string' && t.toLowerCase().includes(q));
      const authorObj = getAuthor(post);
      const authorMatch = (authorObj.name || '').toLowerCase().includes(q);

      return matchesCategory && (titleMatch || excerptMatch || tagMatch || authorMatch);
    });
  }, [publishedBlogs, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return publishedBlogs.find((b) => b && b.featured) || publishedBlogs[0];
  }, [publishedBlogs]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recently Published';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Page-Level SEO Metadata
  React.useEffect(() => {
    const pageTitle = 'Engineering Insights & Technology Blog | DIGITEX';
    const pageDescription =
      'Technical architectural deep dives, machine learning workflows, e-commerce velocity strategies, and digital engineering benchmarks by senior solutions architects at DIGITEX.';
    const pageUrl = 'https://www.digitexagency.in/blog';

    document.title = pageTitle;

    const setMeta = (attr: string, key: string, val: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMeta('name', 'description', pageDescription);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDescription);

    // Canonical link management
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    let canonicalEl: HTMLLinkElement;
    if (canonicalLinks.length > 0) {
      canonicalEl = canonicalLinks[0] as HTMLLinkElement;
      for (let i = 1; i < canonicalLinks.length; i++) {
        canonicalLinks[i].remove();
      }
    } else {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', pageUrl);
  }, []);

  return (
    <div className="bg-[#FAFAF8] text-[#111111] min-h-screen">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E5E5E3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#111111] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
              <span>DIGITEX INSIGHTS & ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.08]">
              Engineering Insights, <br className="hidden sm:inline" />
              <span className="text-[#E11D2E]">AI Strategy & Digital Growth.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl">
              Architectural deep dives, machine learning workflows, e-commerce velocity strategies, and digital engineering benchmarks written directly by senior solutions architects at DIGITEX.
            </p>
          </div>

          {/* SEARCH & CATEGORY BAR */}
          <div className="mt-10 pt-8 border-t border-[#E5E5E3] flex flex-col md:flex-row md:items-center justify-between gap-5">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or tech..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAFAF8] border border-[#E5E5E3] focus:border-[#E11D2E] focus:outline-none focus:ring-1 focus:ring-[#E11D2E] text-xs font-medium text-[#111111] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#111111]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-[#FAFAF8] text-[#6B7280] hover:text-[#111111] hover:bg-white border border-[#E5E5E3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED ARTICLE (IF AVAILABLE & NO ACTIVE SEARCH FILTER) */}
      {!searchQuery && selectedCategory === 'All' && featuredPost && (
        <section className="py-12 bg-[#FAFAF8] border-b border-[#E5E5E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E11D2E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED ARTICLE</span>
            </div>

            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group bg-white rounded-3xl border border-[#E5E5E3] overflow-hidden p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E5E5E3] relative">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={
                      featuredPost.coverImage ||
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={featuredPost.title || 'Featured Post'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#111111] border border-[#E5E5E3] shadow-xs">
                  {featuredPost.category}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#E11D2E]" />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E11D2E]" />
                    {featuredPost.readTime || '5 min read'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight group-hover:text-[#E11D2E] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Author Info */}
                {(() => {
                  const author = getAuthor(featuredPost);
                  return (
                    <div className="pt-2 flex items-center justify-between border-t border-[#E5E5E3]">
                      <div className="flex items-center gap-3">
                        {author.avatar ? (
                          <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#E5E5E3]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#FAFAF8] text-[#111111] font-bold text-xs flex items-center justify-center border border-[#E5E5E3]">
                            {author.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-[#111111]">{author.name}</div>
                          <div className="text-[10px] text-[#6B7280]">{author.role}</div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E11D2E] group-hover:translate-x-1 transition-transform">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  );
                })()}
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 3. BLOG POSTS GRID */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#E5E5E3]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
              {searchQuery
                ? `Search Results (${filteredBlogs.length})`
                : selectedCategory === 'All'
                ? `All Articles (${filteredBlogs.length})`
                : `${selectedCategory} (${filteredBlogs.length})`}
            </h2>
            <div className="text-xs text-[#6B7280]">
              Updated bi-weekly by the DIGITEX engineering team
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E5E3] p-12 text-center max-w-lg mx-auto my-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#E11D2E] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">No articles found</h3>
              <p className="text-xs text-[#6B7280]">
                We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try adjusting your keywords or category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-bold hover:bg-[#E11D2E] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <article
                  key={post.id || post.slug}
                  className="group bg-white rounded-2xl border border-[#E5E5E3] shadow-xs hover:shadow-md hover:border-[#E11D2E]/40 transition-all duration-200 flex flex-col justify-between overflow-hidden transform hover:-translate-y-0.5"
                >
                  <div>
                    {/* Cover Image */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block aspect-[16/10] overflow-hidden bg-neutral-100 relative"
                    >
                      <img
                        src={
                          post.coverImage ||
                          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
                        }
                        alt={post.title || 'Blog Article'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#111111] border border-[#E5E5E3]">
                        {post.category || 'Engineering'}
                      </div>
                    </Link>

                    {/* Content Body */}
                    <div className="p-6 sm:p-7 space-y-3.5">
                      {/* Meta dates */}
                      <div className="flex items-center gap-2.5 text-[11px] text-[#6B7280]">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-[#E11D2E]" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-[#E11D2E]" />
                          {post.readTime || '5 min read'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors leading-snug tracking-tight">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAFAF8] text-[10px] font-semibold text-[#6B7280] border border-[#E5E5E3]"
                            >
                              <Tag className="w-2.5 h-2.5 text-[#E11D2E]" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer with Author and CTA */}
                  {(() => {
                    const author = getAuthor(post);
                    return (
                      <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#E5E5E3] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {author.avatar ? (
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-7 h-7 rounded-full object-cover border border-[#E5E5E3]"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-[#FAFAF8] text-[#111111] font-bold text-[10px] flex items-center justify-center border border-[#E5E5E3]">
                              {author.name.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs font-bold text-[#111111]">
                            {author.name}
                          </span>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#E11D2E] group-hover:translate-x-1 transition-transform"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    );
                  })()}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CONVERSION / ARCHITECTURE CONSULTATION CTA */}
      <section className="py-20 bg-[#111111] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2E]" />
            <span>PARTNER WITH DIGITEX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Have a Complex Engineering or AI Challenge?
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] mt-3 leading-relaxed">
            Our solutions architects review enterprise specifications, evaluate tech stacks, and deliver detailed sprint roadmaps within 24 to 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold px-7 py-3.5 rounded-full shadow-xs transition-colors"
            >
              <span>Request Architectural Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold px-6 py-3.5 rounded-full transition-colors border border-white/10"
            >
              <span>Contact Solutions Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
