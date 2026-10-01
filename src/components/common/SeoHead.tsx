import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const SeoHead: React.FC = () => {
  const { pathname } = useLocation();
  const { seo } = useData();

  useEffect(() => {
    if (!seo) return;

    // Determine page key from pathname
    let pageKey = 'home';
    if (pathname === '/') pageKey = 'home';
    else if (pathname.startsWith('/about')) pageKey = 'about';
    else if (pathname === '/services') pageKey = 'services';
    else if (pathname === '/projects') pageKey = 'projects';
    else if (pathname === '/contact') pageKey = 'contact';
    else if (pathname === '/get-a-quote') pageKey = 'quote';
    else if (pathname === '/industries') pageKey = 'industries';

    const pageSeo = (seo.pages && seo.pages[pageKey]) || {};
    const globalSeo = seo.global || {
      websiteTitle: 'DIGITEX - Digital Solutions & Marketing Agency',
      defaultDescription: 'Enterprise technology, custom software development, web & mobile applications, AI solutions, and digital marketing agency.',
      defaultOgImage: '/assets/digitex-icon.svg',
      canonicalBaseUrl: 'https://digitex.media',
    };

    const title = pageSeo.title || globalSeo.websiteTitle || 'DIGITEX';
    const description = pageSeo.description || globalSeo.defaultDescription;
    const ogTitle = pageSeo.ogTitle || title;
    const ogDescription = pageSeo.ogDescription || description;
    const ogImage = pageSeo.ogImage || globalSeo.defaultOgImage;
    const canonical =
      pathname === '/'
        ? 'https://www.digitexagency.in/'
        : `${(globalSeo.canonicalBaseUrl || 'https://www.digitexagency.in').replace(/\/$/, '')}${pathname}`;

    // Update document title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let meta = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content || '');
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', ogTitle);
    setMetaTag('property', 'og:description', ogDescription);
    setMetaTag('property', 'og:image', ogImage);

    // Update canonical link (maintaining strictly one canonical tag in document head)
    const existingCanonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    let canonicalLink: HTMLLinkElement;
    if (existingCanonicalLinks.length > 0) {
      canonicalLink = existingCanonicalLinks[0] as HTMLLinkElement;
      // Remove any duplicate canonical links if any exist
      for (let i = 1; i < existingCanonicalLinks.length; i++) {
        existingCanonicalLinks[i].remove();
      }
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  }, [pathname, seo]);

  return null;
};
