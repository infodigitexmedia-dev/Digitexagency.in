import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Check,
  Tag,
  ChevronRight,
  Linkedin,
  Twitter,
  BookOpen,
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs } = useData();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const blog = useMemo(() => {
    return (blogs || []).find(
      (b) => b.slug === slug || b.id === slug
    );
  }, [blogs, slug]);

  const relatedPosts = useMemo(() => {
    if (!blog) return [];
    return (blogs || [])
      .filter((b) => b.id !== blog.id && b.status !== 'draft')
      .slice(0, 3);
  }, [blogs, blog]);

  // Safe Author helper
  const getAuthor = (b?: any) => {
    if (!b || !b.author) {
      return {
        name: 'Aarav Mehta',
        role: 'Principal Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
    }
    if (typeof b.author === 'string') {
      return {
        name: b.author,
        role: 'Solutions Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
    }
    return {
      name: b.author.name || 'Aarav Mehta',
      role: b.author.role || 'Principal Solutions Architect',
      avatar:
        b.author.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };
  };

  const author = useMemo(() => getAuthor(blog), [blog]);

  // Dynamic SEO & Structured Data
  useEffect(() => {
    if (!blog) return;

    const pageTitle = `${blog.seoTitle || blog.title} | DIGITEX Insights`;
    const pageDescription = blog.seoDescription || blog.excerpt;
    const pageUrl = `https://www.digitexagency.in/blog/${blog.slug}`;

    document.title = pageTitle;

    // Helper for meta tags
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
    setMeta('property', 'og:image', blog.coverImage);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:type', 'article');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDescription);
    setMeta('name', 'twitter:image', blog.coverImage);

    // Update Canonical link
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

    // Inject JSON-LD Structured Data
    const schemaScriptId = 'digitex-article-schema';
    let script = document.getElementById(schemaScriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const currentAuthor = getAuthor(blog);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      image: [blog.coverImage],
      datePublished: blog.publishedAt,
      dateModified: blog.publishedAt,
      author: {
        '@type': 'Person',
        name: currentAuthor.name,
        jobTitle: currentAuthor.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'DIGITEX',
        url: 'https://www.digitexagency.in/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.digitexagency.in/assets/digitex-logo-dark.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
    };

    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(schemaScriptId);
      if (el) el.remove();
    };
  }, [blog]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FAFAF8] px-4 py-20">
        <div className="max-w-md w-full bg-white border border-[#E5E5E3] rounded-2xl p-8 sm:p-12 text-center shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#E11D2E] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#111111]">Article Not Found</h1>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            The article you are looking for may have been moved, renamed, or unpublished.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#E11D2E] text-white hover:bg-[#B91C2B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Parse markdown formatting into clean JSX
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let inTable = false;
    let tableBuffer: string[] = [];

    const flushTable = (idx: number) => {
      if (tableBuffer.length === 0) return;
      const rows = tableBuffer.map((r) =>
        r
          .split('|')
          .filter((_, i, arr) => i > 0 && i < arr.length - 1)
          .map((c) => c.trim())
      );

      const headerRow = rows[0] || [];
      const bodyRows = rows.slice(2); // Skip separator row

      elements.push(
        <div key={`table-${idx}`} className="my-6 overflow-x-auto rounded-xl border border-[#E5E5E3]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAFAF8] border-b border-[#E5E5E3] text-[#111111] font-bold">
              <tr>
                {headerRow.map((cell, ci) => (
                  <th key={ci} className="py-3 px-4">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E3] text-[#2A2A2A]">
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="hover:bg-neutral-50/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2.5 px-4 font-mono text-[11px]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableBuffer = [];
      inTable = false;
    };

    lines.forEach((line, index) => {
      // Code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="my-5 p-4 rounded-xl bg-[#111111] text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed border border-white/10"
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Tables
      if (line.trim().startsWith('|')) {
        inTable = true;
        tableBuffer.push(line);
        return;
      } else if (inTable) {
        flushTable(index);
      }

      // Headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight mt-10 mb-4 pt-4 border-t border-[#E5E5E3]"
          >
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            className="text-lg sm:text-xl font-bold text-[#111111] tracking-tight mt-8 mb-3"
          >
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Unordered list items
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const text = line.trim().replace(/^[\*\-]\s+/, '');
        elements.push(
          <li key={index} className="ml-5 list-disc text-sm text-[#2A2A2A] leading-relaxed mb-1.5">
            <span
              dangerouslySetInnerHTML={{
                __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </li>
        );
        return;
      }

      // Ordered list items
      if (/^\d+\.\s+/.test(line.trim())) {
        const text = line.trim().replace(/^\d+\.\s+/, '');
        elements.push(
          <li key={index} className="ml-5 list-decimal text-sm text-[#2A2A2A] leading-relaxed mb-1.5">
            <span
              dangerouslySetInnerHTML={{
                __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </li>
        );
        return;
      }

      // Standard Paragraph
      if (line.trim().length > 0) {
        elements.push(
          <p
            key={index}
            className="text-sm sm:text-base text-[#2A2A2A] leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
            }}
          />
        );
      }
    });

    if (inTable) {
      flushTable(lines.length);
    }

    return elements;
  };

  return (
    <div className="bg-[#FAFAF8] text-[#111111] min-h-screen">
      {/* 1. BREADCRUMBS & ARTICLE HEADER */}
      <section className="bg-white border-b border-[#E5E5E3] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
            <Link to="/" className="hover:text-[#111111] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#9CA3AF]" />
            <Link to="/blog" className="hover:text-[#111111] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3 text-[#9CA3AF]" />
            <span className="text-[#111111] font-semibold truncate max-w-[200px] sm:max-w-none">
              {blog.category}
            </span>
          </nav>

          {/* Category & Metadata Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#111111] text-white">
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#6B7280] font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#E11D2E]" />
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recently Published'}
            </span>
            <span className="text-[#6B7280]">·</span>
            <span className="flex items-center gap-1 text-xs text-[#6B7280] font-medium">
              <Clock className="w-3.5 h-3.5 text-[#E11D2E]" />
              {blog.readTime}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.12] mb-6">
            {blog.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed border-l-2 border-[#E11D2E] pl-4 mb-8">
            {blog.excerpt}
          </p>

          {/* Author Block & Social Share Buttons */}
          <div className="pt-6 border-t border-[#E5E5E3] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#E5E5E3]"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#FAFAF8] text-[#111111] font-bold text-sm flex items-center justify-center border border-[#E5E5E3]">
                  {author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-sm font-bold text-[#111111]">
                  {author.name}
                </div>
                <div className="text-xs text-[#6B7280]">
                  {author.role}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAFAF8] hover:bg-neutral-100 border border-[#E5E5E3] text-xs font-semibold text-[#111111] transition-colors cursor-pointer"
                title="Copy Article URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  blog.title
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAFAF8] hover:bg-neutral-100 border border-[#E5E5E3] flex items-center justify-center text-[#111111] hover:text-[#E11D2E] transition-colors"
                title="Share on X (Twitter)"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FAFAF8] hover:bg-neutral-100 border border-[#E5E5E3] flex items-center justify-center text-[#111111] hover:text-[#E11D2E] transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COVER IMAGE */}
      <section className="py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden border border-[#E5E5E3] shadow-sm bg-white aspect-[16/9]">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 3. MAIN ARTICLE BODY */}
      <section className="py-8 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E5E5E3] p-6 sm:p-10 lg:p-12 shadow-xs">
            {renderContent(blog.content)}

            {/* Tag List */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-[#E5E5E3] flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#111111] mr-2">Tags:</span>
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAFAF8] border border-[#E5E5E3] text-xs font-semibold text-[#6B7280]"
                  >
                    <Tag className="w-3 h-3 text-[#E11D2E]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Author Bio Card */}
            <div className="mt-10 p-6 rounded-2xl bg-[#FAFAF8] border border-[#E5E5E3] flex items-start gap-4">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E5E5E3] shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white text-[#111111] font-bold text-sm flex items-center justify-center border border-[#E5E5E3] shrink-0">
                  {(author.name || 'A').charAt(0)}
                </div>
              )}
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E11D2E]">
                  Written By
                </div>
                <h4 className="text-sm font-bold text-[#111111]">
                  {author.name}
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  {author.role || 'Solutions Architect'} at DIGITEX. Leading enterprise software development, system design, and AI application engineering for international partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t border-[#E5E5E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E5E3]">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                Recommended Insights
              </h3>
              <Link
                to="/blog"
                className="text-xs font-bold text-[#E11D2E] hover:underline inline-flex items-center gap-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group bg-[#FAFAF8] rounded-2xl border border-[#E5E5E3] overflow-hidden p-5 hover:border-[#E11D2E]/40 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-200">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-[#E11D2E] uppercase tracking-wider">
                      {rel.category}
                    </div>
                    <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#E11D2E] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E5E5E3] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>{rel.readTime}</span>
                    <span className="font-bold text-[#E11D2E] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Read
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CONVERSION BANNER */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to Build Your Next Digital Solution?
          </h3>
          <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
            From modern web engineering to custom AI and e-commerce platforms, we help ambitious brands launch with speed and confidence.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/get-a-quote"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E11D2E] hover:bg-[#B91C2B] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Get a Tailored Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors border border-white/10"
            >
              <span>Talk to Solutions Engineer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
